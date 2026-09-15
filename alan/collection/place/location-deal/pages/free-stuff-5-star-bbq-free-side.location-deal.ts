import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuff5StarBbqFreeSide = {
  id: "019f322c-9f5e-78cd-8cd2-3f2844e06758",
  type: "page-type/location-deal",
  slug: "free-stuff-5-star-bbq-free-side",
  title: "5 Star BBQ — FREE! Side!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:5-star-bbq:free-side",
  locations: ["location/location-5-star-bbq-utah-county"],
  offerText: "FREE! Side!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
