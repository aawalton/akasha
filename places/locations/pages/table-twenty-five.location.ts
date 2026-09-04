import type { Location } from "../location.page-type.ts"

export const tableTwentyFive = {
  id: "019f1b49-527c-7d82-8272-60e6a03daf35",
  pageTypeSlug: "location",
  slug: "table-twenty-five",
  title: "Table Twenty Five",
  latitude: 51.393311,
  longitude: -2.321255,
  notes: "Good breakfast",
  sourcePlaceId: "gmaps:0xcaf5c91699849668",
  sourceUrl:
    "https://www.google.com/maps/place/Table+Twenty+Five/data=!4m2!3m1!1s0x87530f0e23a23041:0xcaf5c91699849668",
  locationSource: "saved:Want to go",
} as const satisfies Location
