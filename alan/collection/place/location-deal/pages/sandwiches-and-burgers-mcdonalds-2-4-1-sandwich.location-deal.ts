import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const sandwichesAndBurgersMcdonalds241Sandwich = {
  id: "019f322c-afc1-774f-95a8-98728dea4fef",
  type: "page-type/location-deal",
  slug: "sandwiches-and-burgers-mcdonalds-2-4-1-sandwich",
  title: "McDonald's — 2-4-1! Sandwich!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:sandwiches-and-burgers:mcdonalds:2-4-1-sandwich",
  finePrint: "All Orem, N Provo, PG, Cedar Hills & AF",
  locations: [
    "location/mcdonalds-american-fork",
    "location/mcdonalds-cedar-hills",
    "location/mcdonalds-orem",
    "location/mcdonalds-pleasant-grove",
    "location/mcdonalds-provo",
  ],
  offerText: "2-4-1! Sandwich!",
  offerType: "2-4-1",
  section: "Sandwiches & Burgers",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
