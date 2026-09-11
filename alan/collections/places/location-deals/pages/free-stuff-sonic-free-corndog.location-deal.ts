import type { LocationDeal } from "akasha/alan/collections/places/location-deals/location-deal.page-type.types.ts"

export const freeStuffSonicFreeCorndog = {
  id: "019f322c-a2d1-73bb-8060-fac4908b6f6b",
  type: "location-deal",
  slug: "free-stuff-sonic-free-corndog",
  title: "Sonic — FREE! Corndog!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:sonic:free-corndog",
  finePrint: "Valid at All Utah County Locations",
  locations: ["sonic-utah-county"],
  offerText: "FREE! Corndog!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
