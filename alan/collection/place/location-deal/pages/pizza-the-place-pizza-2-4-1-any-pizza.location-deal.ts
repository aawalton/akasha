import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const pizzaThePlacePizza241AnyPizza = {
  id: "019f322c-a601-756d-bd47-083c097281ea",
  type: "page-type/location-deal",
  slug: "pizza-the-place-pizza-2-4-1-any-pizza",
  title: "The Place Pizza — 2-4-1! Any Pizza!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:pizza:the-place-pizza:2-4-1-any-pizza",
  locations: ["location/the-place-pizza-utah-county"],
  offerText: "2-4-1! Any Pizza!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
