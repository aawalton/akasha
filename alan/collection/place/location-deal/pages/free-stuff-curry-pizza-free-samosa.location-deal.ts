import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffCurryPizzaFreeSamosa = {
  id: "019f322c-a01a-72a8-a38b-b93712780667",
  type: "page-type/location-deal",
  slug: "free-stuff-curry-pizza-free-samosa",
  title: "Curry Pizza — FREE! Samosa!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:curry-pizza:free-samosa",
  finePrint: "Lehi",
  locations: ["location/curry-pizza-lehi"],
  offerText: "FREE! Samosa!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
