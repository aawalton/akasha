import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const blockRestaurant = {
  id: "019f1aec-0d2e-79c9-8f1a-2bacef678d18",
  type: "page-type/location",
  slug: "block-restaurant",
  title: "Block Restaurant",
  latitude: 48.1460244,
  longitude: 17.1432917,
  sourcePlaceId: "gmaps:0x5cc92fec9895eec8",
  sourceUrl:
    "https://www.google.com/maps/place/Block+Restaurant/data=!4m2!3m1!1s0x874d907cf8cbbe71:0x5cc92fec9895eec8",
  locationSource: "saved:Want to go",
  createdAt: "2026-06-30T23:45:05.326Z",
  updatedAt: "2026-09-15T17:20:00.000Z",
} as const satisfies Location
