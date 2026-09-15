import type { LocationDeal } from "akasha/alan/collection/places/location-deal/location-deal.page-type.types.ts"

export const freeStuffSipNFree20ozSipNFav = {
  id: "019f322c-a2c9-7e3f-a48f-2019f1c0fecb",
  type: "location-deal",
  slug: "free-stuff-sip-n-free-20oz-sip-n-fav",
  title: "Sip-N — FREE! 20oz Sip-N Fav!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:sip-n:free-20oz-sip-n-fav",
  finePrint: "All Locations",
  locations: ["location/sip-n-utah-county"],
  offerText: "FREE! 20oz Sip-N Fav!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
