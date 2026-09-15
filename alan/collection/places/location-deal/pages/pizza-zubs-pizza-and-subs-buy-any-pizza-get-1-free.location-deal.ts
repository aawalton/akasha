import type { LocationDeal } from "akasha/alan/collection/places/location-deal/location-deal.page-type.types.ts"

export const pizzaZubsPizzaAndSubsBuyAnyPizzaGet1Free = {
  id: "019f322c-a643-7c7b-9215-acdc688aeacb",
  type: "location-deal",
  slug: "pizza-zubs-pizza-and-subs-buy-any-pizza-get-1-free",
  title: "Zub's Pizza & Sub's — Buy Any Pizza, Get 1 FREE!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:pizza:zubs-pizza-and-subs:buy-any-pizza-get-1-free",
  locations: ["location/zubs-pizza-subs-utah-county"],
  offerText: "Buy Any Pizza, Get 1 FREE!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
