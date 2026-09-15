import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const restaurantsVillageInn241Entree = {
  id: "019f322c-ab77-7704-af7f-fe4db9f1616e",
  type: "page-type/location-deal",
  slug: "restaurants-village-inn-2-4-1-entree",
  title: "Village Inn — 2-4-1! Entree!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:restaurants:village-inn:2-4-1-entree",
  finePrint: "Provo",
  locations: ["location/village-inn-provo"],
  offerText: "2-4-1! Entree!",
  offerType: "2-4-1",
  section: "Restaurants",
  struckOut: false,
  useLimit: "3",
  usesUsed: 2,
} as const satisfies LocationDeal
