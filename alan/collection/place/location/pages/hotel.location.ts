import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const hotel = {
  id: "019f1aec-0f3c-7a9e-8df5-f20afcb74264",
  type: "page-type/location",
  slug: "hotel",
  title: "Hotel",
  address:
    "Residenza delle Arti by Lifestyle Hotel, Piazza Sidney Sonnino, 13, 00154 Roma RM, Italy",
  latitude: 41.8892216,
  longitude: 12.4743883,
  sourcePlaceId:
    "takeout:hotel:residenza-delle-arti-by-lifestyle-hotel-piazza-sidney-sonnino-13-00154-roma-rm-italy",
  locationSource: "labeled",
  createdAt: "2026-06-30T23:45:05.852Z",
  updatedAt: "2026-09-15T17:20:44.000Z",
} as const satisfies Location
