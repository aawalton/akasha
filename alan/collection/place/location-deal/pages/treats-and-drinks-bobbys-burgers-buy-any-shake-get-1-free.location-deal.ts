import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const treatsAndDrinksBobbysBurgersBuyAnyShakeGet1Free = {
  id: "019f322c-b09b-7dcb-9c2c-a758cf4632b2",
  type: "page-type/location-deal",
  slug: "treats-and-drinks-bobbys-burgers-buy-any-shake-get-1-free",
  title: "Bobbys Burgers — Buy Any Shake, Get 1 FREE!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:treats-and-drinks:bobbys-burgers:buy-any-shake-get-1-free",
  locations: ["location/bobbys-burgers-utah-county"],
  offerText: "Buy Any Shake, Get 1 FREE!",
  offerType: "free",
  section: "Treats & Drinks",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
