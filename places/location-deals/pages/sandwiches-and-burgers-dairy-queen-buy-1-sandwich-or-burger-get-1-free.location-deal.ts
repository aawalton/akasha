import type { LocationDeal } from "../location-deal.page-type.ts"

export const sandwichesAndBurgersDairyQueenBuy1SandwichOrBurgerGet1Free = {
  id: "019f322c-adc7-73dc-8576-fbc94216e4c3",
  pageTypeSlug: "location-deal",
  slug: "sandwiches-and-burgers-dairy-queen-buy-1-sandwich-or-burger-get-1-free",
  title: "Dairy Queen — Buy 1 Sandwich or Burger, Get 1 FREE!",
  collection: "starving-student-card",
  dealKey: "ssc:sandwiches-and-burgers:dairy-queen:buy-1-sandwich-or-burger-get-1-free",
  finePrint: "Orem, Vineyard, EM & Santaquin",
  locations: [
    "dairy-queen-eagle-mountain",
    "dairy-queen-orem",
    "dairy-queen-santaquin",
    "dairy-queen-vineyard",
  ],
  offerText: "Buy 1 Sandwich or Burger, Get 1 FREE!",
  offerType: "2-4-1",
  section: "Sandwiches & Burgers",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
