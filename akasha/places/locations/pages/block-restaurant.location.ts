import type { Location } from "../location.page-type.ts"

export const blockRestaurant = {
  id: "019f1aec-0d2e-79c9-8f1a-2bacef678d18",
  pageTypeSlug: "location",
  slug: "block-restaurant",
  title: "Block Restaurant",
  latitude: 48.1460244,
  longitude: 17.1432917,
  sourcePlaceId: "gmaps:0x5cc92fec9895eec8",
  sourceUrl:
    "https://www.google.com/maps/place/Block+Restaurant/data=!4m2!3m1!1s0x874d907cf8cbbe71:0x5cc92fec9895eec8",
  locationSource: "saved:Want to go",
} as const satisfies Location
