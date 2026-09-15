import type { LocationDeal } from "akasha/alan/collection/places/location-deal/location-deal.page-type.types.ts"

export const sandwichesAndBurgersMooyah50OffEntirePurchase = {
  id: "019f322c-afd1-7c2d-88ea-a830f87b09db",
  type: "location-deal",
  slug: "sandwiches-and-burgers-mooyah-50-off-entire-purchase",
  title: "Mooyah — 50% OFF! Entire Purchase!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:sandwiches-and-burgers:mooyah:50-off-entire-purchase",
  finePrint: "Entire Purchase! Max $30 Discount",
  locations: ["location/mooyah-utah-county"],
  offerText: "50% OFF! Entire Purchase!",
  offerType: "percent-off",
  section: "Sandwiches & Burgers",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
