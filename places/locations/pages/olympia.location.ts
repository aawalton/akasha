import type { Location } from "../location.page-type.ts"

export const olympia = {
  id: "019f1aec-0c91-7442-8856-d3ae9f9ee6c0",
  pageTypeSlug: "location",
  slug: "olympia",
  title: "Olympia",
  latitude: 47.0451022,
  longitude: -122.8950075,
  sourcePlaceId: "gmaps:0x4f146197e2881b83",
  sourceUrl:
    "https://www.google.com/maps/place/Olympia/data=!4m2!3m1!1s0x5491c9c1ae285569:0x4f146197e2881b83",
  locationSource: "saved:Washington State",
} as const satisfies Location
