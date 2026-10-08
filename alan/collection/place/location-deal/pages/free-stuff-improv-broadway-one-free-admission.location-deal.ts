import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffImprovBroadwayOneFreeAdmission = {
  id: "019f322c-a089-77fb-8c7f-98792676bba3",
  type: "page-type/location-deal",
  slug: "free-stuff-improv-broadway-one-free-admission",
  title: "Improv Broadway — One FREE! Admission!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:improv-broadway:one-free-admission",
  locations: ["location/improv-broadway-utah-county"],
  offerText: "One FREE! Admission!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.321Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
