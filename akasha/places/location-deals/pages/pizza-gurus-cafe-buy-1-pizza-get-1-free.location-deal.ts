import type { LocationDeal } from "../location-deal.page-type.ts"

export const pizzaGurusCafeBuy1PizzaGet1Free = {
  id: "019f322c-a4c8-7288-80ce-87b72d06922d",
  pageTypeSlug: "location-deal",
  slug: "pizza-gurus-cafe-buy-1-pizza-get-1-free",
  title: "Gurus Cafe — Buy 1 Pizza, Get 1 FREE!",
  collection: "starving-student-card",
  dealKey: "ssc:pizza:gurus-cafe:buy-1-pizza-get-1-free",
  finePrint: "Provo Center St & UVU",
  locations: ["gurus-cafe-provo"],
  offerText: "Buy 1 Pizza, Get 1 FREE!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
