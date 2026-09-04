import type { Location } from "../location.page-type.ts"

export const reedsDairy = {
  id: "019f1aec-0f19-742b-958e-bffb00f72871",
  pageTypeSlug: "location",
  slug: "reeds-dairy",
  title: "Reed's Dairy",
  latitude: 43.4980719,
  longitude: -112.0844369,
  notes: "Recommended by Kendall",
  sourcePlaceId: "gmaps:0xc7bb65bc32d3151f",
  sourceUrl:
    "https://www.google.com/maps/place/Reed's+Dairy/data=!4m2!3m1!1s0x53545bd4f768d5d7:0xc7bb65bc32d3151f",
  locationSource: "saved:Idaho",
} as const satisfies Location
