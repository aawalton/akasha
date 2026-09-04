import type { Location } from "../location.page-type.ts"

export const cafeLago = {
  id: "019f1b49-556c-7a88-bd59-6f568f8b2a2a",
  pageTypeSlug: "location",
  slug: "cafe-lago",
  title: "Cafe Lago",
  latitude: 30.2711286,
  longitude: -97.7436995,
  sourcePlaceId: "gmaps:0x17ab611bee9c3686",
  sourceUrl:
    "https://www.google.com/maps/place/Cafe+Lago/data=!4m2!3m1!1s0x865b3992bb02f481:0x17ab611bee9c3686",
  locationSource: "saved:Austin, Texas",
} as const satisfies Location
