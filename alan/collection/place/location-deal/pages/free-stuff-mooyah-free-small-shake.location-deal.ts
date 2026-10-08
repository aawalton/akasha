import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffMooyahFreeSmallShake = {
  id: "019f322c-a14b-7d54-8fd1-34c4a80ef14e",
  type: "page-type/location-deal",
  slug: "free-stuff-mooyah-free-small-shake",
  title: "Mooyah — FREE! Small Shake!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:mooyah:free-small-shake",
  locations: ["location/mooyah-utah-county"],
  offerText: "FREE! Small Shake!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.515Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
