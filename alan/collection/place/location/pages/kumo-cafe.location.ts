import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const kumoCafe = {
  id: "019f1aec-0d17-722e-b063-51922ad9c738",
  type: "page-type/location",
  slug: "kumo-cafe",
  title: "Kumo Cafe",
  latitude: 47.5020332,
  longitude: 19.0501774,
  sourcePlaceId: "gmaps:0x4c33d1379d5b58ef",
  sourceUrl:
    "https://www.google.com/maps/place/Kumo+Cafe/data=!4m2!3m1!1s0x87528b8bf8a63987:0x4c33d1379d5b58ef",
  locationSource: "saved:Want to go",
  createdAt: "2026-06-30T23:45:05.303Z",
  updatedAt: "2026-09-15T17:20:44.000Z",
} as const satisfies Location
