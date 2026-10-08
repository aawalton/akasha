import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const europaPark = {
  id: "019f1aec-0ef7-7860-b37e-bb8981477893",
  type: "page-type/location",
  slug: "europa-park",
  title: "Europa-Park",
  latitude: 48.2649865,
  longitude: 7.720728,
  notes: "Like Disney Epcot, but apparently better",
  sourcePlaceId: "gmaps:0x14b73404fff2ada0",
  sourceUrl:
    "https://www.google.com/maps/place/Europa-Park/data=!4m2!3m1!1s0x4791398732e35ed9:0x14b73404fff2ada0",
  locationSource: "saved:Germany",
  createdAt: "2026-06-30T23:45:05.783Z",
  updatedAt: "2026-09-15T17:20:22.000Z",
} as const satisfies Location
