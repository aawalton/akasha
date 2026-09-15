import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const restaurantsRodizioGrillBuyAnyEntreeGetAnySpecialtyBeverageAndAnyDessertFree = {
  id: "019f322c-aaec-7de7-a254-f07fb911c50a",
  type: "page-type/location-deal",
  slug: "restaurants-rodizio-grill-buy-any-entree-get-any-specialty-beverage-and-any-dessert-free",
  title: "Rodizio Grill — Buy Any Entree, Get Any Specialty Beverage & Any Dessert FREE!",
  collection: "location-collection/starving-student-card",
  dealKey:
    "ssc:restaurants:rodizio-grill:buy-any-entree-get-any-specialty-beverage-and-any-dessert-free",
  finePrint: "(Up to 2 People) Excludes Holidays. Provo",
  locations: ["location/rodizio-grill-provo"],
  offerText: "Buy Any Entree, Get Any Specialty Beverage & Any Dessert FREE!",
  offerType: "free",
  section: "Restaurants",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
