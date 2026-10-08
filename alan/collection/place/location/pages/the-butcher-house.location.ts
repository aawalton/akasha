import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const theButcherHouse = {
  id: "019f1aec-0dbd-7b46-8808-3aca77418b99",
  type: "page-type/location",
  slug: "the-butcher-house",
  title: "The Butcher House",
  latitude: 41.9717404,
  longitude: 12.5503236,
  sourcePlaceId: "gmaps:0x479ffe6e4b64e23a",
  sourceUrl:
    "https://www.google.com/maps/place/The+Butcher+House/data=!4m2!3m1!1s0x132f64364dd4ddbb:0x479ffe6e4b64e23a",
  locationSource: "saved:Rome, Italy",
  createdAt: "2026-06-30T23:45:05.469Z",
  updatedAt: "2026-09-15T17:22:08.000Z",
} as const satisfies Location
