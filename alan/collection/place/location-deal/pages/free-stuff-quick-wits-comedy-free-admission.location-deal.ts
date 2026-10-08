import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffQuickWitsComedyFreeAdmission = {
  id: "019f322c-a270-7272-b02d-6b7f21454c4a",
  type: "page-type/location-deal",
  slug: "free-stuff-quick-wits-comedy-free-admission",
  title: "Quick Wits Comedy — FREE! Admission!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:quick-wits-comedy:free-admission",
  locations: ["location/quick-wits-comedy-utah-county"],
  offerText: "FREE! Admission!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.808Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
