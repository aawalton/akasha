import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffQuenchItFreePretzelBites = {
  id: "019f322c-a267-7ee9-b9cf-b7c61903f47f",
  type: "page-type/location-deal",
  slug: "free-stuff-quench-it-free-pretzel-bites",
  title: "Quench It! — FREE! Pretzel Bites!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:quench-it:free-pretzel-bites",
  finePrint: "All Ut County & Bluffdale",
  locations: ["location/quench-it-bluffdale"],
  offerText: "FREE! Pretzel Bites!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.799Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
