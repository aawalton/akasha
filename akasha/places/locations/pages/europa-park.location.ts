import type { Location } from "../location.page-type.ts"

export const europaPark = {
  id: "019f1aec-0ef7-7860-b37e-bb8981477893",
  pageTypeSlug: "location",
  slug: "europa-park",
  title: "Europa-Park",
  latitude: 48.2649865,
  longitude: 7.720728,
  notes: "Like Disney Epcot, but apparently better",
  sourcePlaceId: "gmaps:0x14b73404fff2ada0",
  sourceUrl:
    "https://www.google.com/maps/place/Europa-Park/data=!4m2!3m1!1s0x4791398732e35ed9:0x14b73404fff2ada0",
  locationSource: "saved:Germany",
} as const satisfies Location
