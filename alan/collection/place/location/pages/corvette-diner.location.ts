import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const corvetteDiner = {
  id: "019f1aec-0e5c-742b-841d-1f19f5c4feb0",
  type: "page-type/location",
  slug: "corvette-diner",
  title: "Corvette Diner",
  latitude: 32.7417248,
  longitude: -117.2097429,
  sourcePlaceId: "gmaps:0x76803752ce827901",
  sourceUrl:
    "https://www.google.com/maps/place/Corvette+Diner/data=!4m2!3m1!1s0x80deab0339f548b1:0x76803752ce827901",
  locationSource: "saved:CA, San Diego",
  createdAt: "2026-06-30T23:45:05.628Z",
  updatedAt: "2026-09-15T17:20:22.000Z",
} as const satisfies Location
