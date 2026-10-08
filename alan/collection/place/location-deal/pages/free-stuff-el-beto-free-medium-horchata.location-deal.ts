import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffElBetoFreeMediumHorchata = {
  id: "019f322c-a063-7185-b591-e23d98fb366f",
  type: "page-type/location-deal",
  slug: "free-stuff-el-beto-free-medium-horchata",
  title: "El Beto — FREE! Medium Horchata!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:el-beto:free-medium-horchata",
  finePrint: "Provo",
  locations: ["location/el-beto-provo"],
  offerText: "FREE! Medium Horchata!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:53.283Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
