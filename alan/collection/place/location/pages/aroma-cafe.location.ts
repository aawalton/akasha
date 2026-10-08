import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const aromaCafe = {
  id: "019f1aec-0d15-7ee4-82d0-556aaddc46df",
  type: "page-type/location",
  slug: "aroma-cafe",
  title: "Aroma Cafe",
  latitude: 51.5818872,
  longitude: -0.1576841,
  sourcePlaceId: "gmaps:0x64364f6813f1fe51",
  sourceUrl:
    "https://www.google.com/maps/place/Aroma+Cafe/data=!4m2!3m1!1s0x874da923e49d027b:0x64364f6813f1fe51",
  locationSource: "saved:Want to go",
  createdAt: "2026-06-30T23:45:05.301Z",
  updatedAt: "2026-09-15T17:20:00.000Z",
} as const satisfies Location
