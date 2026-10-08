import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const templeOfDebod = {
  id: "019f1aec-0d6a-74c6-955a-c34c3d2b1d79",
  type: "page-type/location",
  slug: "temple-of-debod",
  title: "Temple of Debod",
  latitude: 40.4240372,
  longitude: -3.7177252,
  notes: "Egyptian temple given to Madrid as a thank you",
  sourcePlaceId: "gmaps:0x1d6ad9c64a7706ab",
  sourceUrl:
    "https://www.google.com/maps/place/Temple+of+Debod/data=!4m2!3m1!1s0xd42286e8bea1259:0x1d6ad9c64a7706ab",
  locationSource: "saved:Madrid, Spain",
  createdAt: "2026-06-30T23:45:05.386Z",
  updatedAt: "2026-09-15T17:22:08.000Z",
} as const satisfies Location
