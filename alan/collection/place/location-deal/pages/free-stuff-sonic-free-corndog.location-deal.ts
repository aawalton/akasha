import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffSonicFreeCorndog = {
  id: "019f322c-a2d1-73bb-8060-fac4908b6f6b",
  type: "page-type/location-deal",
  slug: "free-stuff-sonic-free-corndog",
  title: "Sonic — FREE! Corndog!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:sonic:free-corndog",
  finePrint: "Valid at All Utah County Locations",
  locations: ["location/sonic-utah-county"],
  offerText: "FREE! Corndog!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.905Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
