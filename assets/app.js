document.addEventListener("alpine:init", () => {
  Alpine.data("product", () => ({
    product: null, // Data produk yang akan ditampilkan
    items: [
      {
        id: 1,
        name: "Vans sk8 mid bw",
        size: "40",
        price: 20000,
        imgs: ["images/product/product-1a.jpg", "images/product/product-1b.jpg", "images/product/product-1c.jpg", "images/product/product-1d.jpg"],
      },
      {
        id: 2,
        name: "Vans OS",
        size: "40",
        price: 40000,
        imgs: ["images/product/product-2a.jpg", "images/product/product-2b.jpg", "images/product/product-2c.jpg", "images/product/product-2d.jpg"],
      },
      {
        id: 3,
        name: "Vans style 36 bandana",
        size: "41",
        price: 25000,
        imgs: ["images/product/product-3a.jpg", "images/product/product-3b.jpg", "images/product/product-3c.jpg", "images/product/product-3d.jpg"],
      },
      {
        id: 4,
        name: "Vans OS BW",
        size: "41",
        price: 20000,
        imgs: ["images/product/product-4a.jpg", "images/product/product-4b.jpg", "images/product/product-4c.jpg", "images/product/product-4d.jpg"],
      },
      {
        id: 5,
        name: "Vans sk8 black",
        size: "41",
        price: 20000,
        imgs: ["images/product/product-5a.jpg", "images/product/product-5b.jpg", "images/product/product-5c.jpg", "images/product/product-5d.jpg"],
      },
      {
        id: 6,
        name: "Vans AU Purple",
        size: "41",
        price: 20000,
        imgs: ["images/product/product-6a.jpg", "images/product/product-6b.jpg", "images/product/product-6c.jpg", "images/product/product-6d.jpg"],
      },
      {
        id: 7,
        name: "Vans sk8 Low",
        size: "38",
        price: 20000,
        imgs: ["images/product/product-7a.jpg", "images/product/product-7b.jpg", "images/product/product-7c.jpg", "images/product/product-7d.jpg"],
      },
      {
        id: 8,
        name: "Vans sk8 Hijau",
        size: "40",
        price: 20000,
        imgs: ["images/product/product-8a.jpg", "images/product/product-8b.jpg", "images/product/product-8c.jpg", "images/product/product-8d.jpg"],
      },
    ],

    cart: JSON.parse(localStorage.getItem("cart")) || [],
    init() {
      const productId = getProductId();
      this.product = this.items.find((item) => item.id == productId);

      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Cart synchronized:", this.cart);
    },

    get cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }

      // Trigger reactivity update untuk Alpine.js
      this.cart = [...this.cart];

      // Simpan perubahan ke localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));

      // SweetAlert untuk notifikasi
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `${product.name} Dimasukan Ke Keranjang`,
        customClass: {
          icon: "swal2-icon-center",
        },
      });
    },
  }));

  Alpine.data("cartPage", () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    quantity: JSON.parse(localStorage.getItem("quantity")) || 0,
    init() {
      // Sinkronisasi cart dengan localStorage
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Cart synchronized:", this.cart);
    },

    get cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    addToCart(product, quantity = 1) {
      const existingProduct = this.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: quantity });
      }

      // Trigger reactivity update untuk Alpine.js
      this.cart = [...this.cart];

      // Simpan perubahan ke localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));

      // SweetAlert untuk notifikasi
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `${product.name} Telah Dicancel`,
        customClass: {
          icon: "swal2-icon-center",
        },
      });
    },

    removeFromCart(productId) {
      // Filter untuk menghapus item berdasarkan ID
      this.cart = this.cart.filter((item) => item.id !== productId);

      // Update localStorage setelah perubahan
      localStorage.setItem("cart", JSON.stringify(this.cart));

      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `Product Telah Dicancel`,
        customClass: {
          icon: "swal2-icon-center",
        },
      });
    },

    calculateSubTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    calculateTax() {
      return this.calculateSubTotal() * 0.1; // Pajak 10%
    },
    calculateTotal() {
      return this.calculateSubTotal() + this.calculateTax();
    },
    get cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    checkout() {
      if (this.cart.length === 0) {
        alert("Keranjang belanja Anda kosong!");
        return;
      }

      let message = "Halo, saya ingin memesan:\n\n";

      this.cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Qty: ${item.quantity}\n`;
      });

      const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      message += `\nTotal: Rp${total.toLocaleString("id-ID")}\n\n`;
      message += "Terima kasih!";

      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = "6287721561947"; // Ganti dengan nomor WhatsApp Anda
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    },
  }));

  function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  // function getProductId() {
  //   const params = new URLSearchParams(window.location.search);
  //   return params.get("id");
  // }

  // Alpine.store("cart", {
  //   items: [],
  //   total: 0,
  //   quantity: 0,

  //   add(newItem, qty = 1) {
  //     const cartItem = this.items.find((item) => item.id === newItem.id);

  //     if (!cartItem) {
  //       this.items.push({
  //         ...newItem,
  //         quantity: qty,
  //         total: newItem.price * qty,
  //       });

  //       this.quantity += qty;
  //       this.total += newItem.price * qty;

  //       console.log(newItem);
  //     } else {
  //       this.items = this.items.map((item) => {
  //         if (item.id !== newItem.id) {
  //           return item;
  //         } else {
  //           item.quantity += qty;
  //           // item.duration += duration;
  //           item.total = item.price * item.quantity;
  //           this.quantity += qty;
  //           this.total = this.calculateTotal();
  //           return item;
  //         }
  //       });
  //     }
  //   },

  //   //   addQty(item, qty) {
  //   //     const cartItem = this.items.find((cartItem) => cartItem.id === item.id);

  //   //     if (!cartItem) {
  //   //       // Handle jika item belum ada di keranjang
  //   //       return;
  //   //     }

  //   //     this.items = this.items.map((item) => {
  //   //       if (item.id !== cartItem.id) {
  //   //         return item;
  //   //       } else {
  //   //         item.quantity += qty;
  //   //         item.total = item.price * item.quantity * item.duration;
  //   //         this.quantity += qty;
  //   //         this.total = this.calculateTotal();
  //   //         return item;
  //   //       }
  //   //     });
  //   //   },
  //   //   addDuration(item, duration) {
  //   //     this.add(item, 0, duration);
  //   //   },
  //   calculateTotal() {
  //     return this.items.reduce((acc, item) => acc + item.total, 0);
  //   },

  //   //   remove(id) {
  //   //     const cartItem = this.items.find((item) => item.id === id);

  //   //     if (cartItem.quantity > 1) {
  //   //       this.items = this.items.map((item) => {
  //   //         if (item.id !== id) {
  //   //           return item;
  //   //         } else {
  //   //           item.quantity--;
  //   //           item.total = item.price * item.quantity * item.duration; // Perbaikan perhitungan total
  //   //           this.quantity--;
  //   //           this.total = this.calculateTotal(); // Hitung ulang total
  //   //           return item;
  //   //         }
  //   //       });
  //   //     } else if (cartItem.quantity === 1) {
  //   //       this.items = this.items.filter((item) => item.id !== id);

  //   //       this.quantity--;
  //   //       this.total = this.calculateTotal(); // Hitung ulang total
  //   //     }
  //   //   },

  //   //   removeDuration(id) {
  //   //     const cartItem = this.items.find((item) => item.id === id);

  //   //     if (cartItem.duration > 1) {
  //   //       this.items = this.items.map((item) => {
  //   //         if (item.id !== id) {
  //   //           return item;
  //   //         } else {
  //   //           item.duration--;
  //   //           item.total = item.price * item.quantity * item.duration; // Perbaikan perhitungan total
  //   //           this.total = this.calculateTotal(); // Hitung ulang total
  //   //           return item;
  //   //         }
  //   //       });
  //   //     } else if (cartItem.duration === 1) {
  //   //       // Handle jika durasi sama dengan 1
  //   //       // ...
  //   //     }
  //   //   },
  // });
});

// const checkoutButton = document.querySelector(".checkout-button");
// checkoutButton.disabled = true;

// const form = document.querySelector("#checkout");

// form.addEventListener("keyup", function (e) {
//   e.preventDefault();
//   for (let i = 0; i < form.elements.length; i++) {
//     if (form.elements[i].value.length !== 0) {
//       checkoutButton.classList.remove("disable");
//       checkoutButton.classList.add("disable");
//     } else {
//       return false;
//     }
//   }

//   checkoutButton.disabled = false;
//   checkoutButton.classList.remove("disable");
// });

// // checkout

// checkoutButton.addEventListener("click", function (e) {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const data = new URLSearchParams(formData);
//   const objData = Object.fromEntries(data);

//   const message = formatMessage(objData);

//   window.open("https://wa.me/6287728025262?text=" + encodeURIComponent(message));
// });

// const formatMessage = (obj) => {
//   return `Tanggal Pesanan ${obj.date}

// Data Customer
// 	Nama : ${obj.name}
// 	Email : ${obj.email}
// 	No Hp : ${obj.phone}

// Data Pesanan
// ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.price)})  ${item.duration} Hari = ${rupiah(item.total)} \n`)}
// TOTAL PEMBAYARAN: ${rupiah(obj.total)}

// _Terhitung 1 Hari Sewa di Setiap Pengambilan Barang Dari Jam 15.00 WIB. Kurang Dari Itu Sudah Terhitung Sewa Lebih Dari 1 Hari, Terimakasih._
// Salam Admin Newabi.
// Andi Maulana.
// 	`;
// };

// Konversi Rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
