import type { Location } from "../location.page-type.ts"

export const theGulch = {
  id: "019f1aec-0df6-72be-9f27-67fcf54ecdd2",
  pageTypeSlug: "location",
  slug: "the-gulch",
  title: "The Gulch",
  latitude: 36.1530115,
  longitude: -86.7841015,
  sourcePlaceId: "gmaps:0xcf0331e4addba097",
  sourceUrl:
    "https://www.google.com/maps/place/The+Gulch/data=!4m2!3m1!1s0x8864668a8cd1d3e9:0xcf0331e4addba097",
  locationSource: "saved:Nashville, Tennessee",
} as const satisfies Location
