import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffProvoBakeryFreeDonut = {
  id: "019f322c-a25e-7e5f-8eba-f603482611ff",
  type: "page-type/location-deal",
  slug: "free-stuff-provo-bakery-free-donut",
  title: "Provo Bakery — FREE! Donut!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:provo-bakery:free-donut",
  locations: ["location/provo-bakery-utah-county"],
  offerText: "FREE! Donut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.790Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
