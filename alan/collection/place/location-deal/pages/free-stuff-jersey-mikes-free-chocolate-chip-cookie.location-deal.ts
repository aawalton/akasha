import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffJerseyMikesFreeChocolateChipCookie = {
  id: "019f322c-a08f-7228-a29e-03cd2f864dbd",
  type: "page-type/location-deal",
  slug: "free-stuff-jersey-mikes-free-chocolate-chip-cookie",
  title: "Jersey Mikes — FREE! Chocolate Chip Cookie!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:jersey-mikes:free-chocolate-chip-cookie",
  finePrint: "All Utah Cnty except EM and SF",
  locations: ["location/jersey-mikes-utah-county"],
  offerText: "FREE! Chocolate Chip Cookie!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
