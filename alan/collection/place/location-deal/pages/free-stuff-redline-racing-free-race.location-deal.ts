import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffRedlineRacingFreeRace = {
  id: "019f322c-a275-78b3-bafd-bac9a104bf64",
  type: "page-type/location-deal",
  slug: "free-stuff-redline-racing-free-race",
  title: "Redline Racing — FREE! Race!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:redline-racing:free-race",
  finePrint: "Includes free helmet & headsock.",
  locations: ["location/redline-racing-utah-county"],
  offerText: "FREE! Race!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.813Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
