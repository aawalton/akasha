import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffPeaksIceArenaFreeAdmission = {
  id: "019f322c-a208-736b-924e-bba503d844e5",
  type: "page-type/location-deal",
  slug: "free-stuff-peaks-ice-arena-free-admission",
  title: "Peaks Ice Arena — FREE! Admission!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:peaks-ice-arena:free-admission",
  finePrint: "Skate Rental Not Included!",
  locations: ["location/peaks-ice-arena-utah-county"],
  offerText: "FREE! Admission!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.704Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
