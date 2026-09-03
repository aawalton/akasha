import type { Location } from "../location.page-type.ts"

export const museumOfGlass = {
  id: "019f1aec-0cac-7d1d-bec1-b7b2b145abd4",
  pageTypeSlug: "location",
  slug: "museum-of-glass",
  title: "Museum of Glass",
  latitude: 47.2458241,
  longitude: -122.4338197,
  sourcePlaceId: "gmaps:0xac5e5244de66c75e",
  sourceUrl:
    "https://www.google.com/maps/place/Museum+of+Glass/data=!4m2!3m1!1s0x54905577af033319:0xac5e5244de66c75e",
  locationSource: "saved:Washington State",
} as const satisfies Location
