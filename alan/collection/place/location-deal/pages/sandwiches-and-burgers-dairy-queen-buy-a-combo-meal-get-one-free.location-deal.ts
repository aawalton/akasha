import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const sandwichesAndBurgersDairyQueenBuyAComboMealGetOneFree = {
  id: "019f322c-adbc-7719-965b-87080d77ad32",
  type: "location-deal",
  slug: "sandwiches-and-burgers-dairy-queen-buy-a-combo-meal-get-one-free",
  title: "Dairy Queen — Buy a Combo Meal, Get One FREE!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:sandwiches-and-burgers:dairy-queen:buy-a-combo-meal-get-one-free",
  finePrint: "Orem, Vineyard, EM & Santaquin",
  locations: [
    "location/dairy-queen-eagle-mountain",
    "location/dairy-queen-orem",
    "location/dairy-queen-santaquin",
    "location/dairy-queen-vineyard",
  ],
  offerText: "Buy a Combo Meal, Get One FREE!",
  offerType: "2-4-1",
  section: "Sandwiches & Burgers",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
