import type { Location } from "../location.page-type.ts"

export const kobe = {
  id: "019f1aec-0d43-7039-a1b2-4e09e6f5d2a5",
  pageTypeSlug: "location",
  slug: "kobe",
  title: "Kobe",
  latitude: 34.6932379,
  longitude: 135.1943764,
  sourcePlaceId: "gmaps:0xd048b74d9aae8d7b",
  sourceUrl:
    "https://www.google.com/maps/place/Kobe/data=!4m2!3m1!1s0x8752616f94b9de0d:0xd048b74d9aae8d7b",
  locationSource: "saved:Want to go",
} as const satisfies Location
