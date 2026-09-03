import type { Location } from "../location.page-type.ts"

export const fiveAllsRestaurant = {
  id: "019f1aec-0cb8-73e7-ba57-d510527baa0d",
  pageTypeSlug: "location",
  slug: "five-alls-restaurant",
  title: "Five Alls restaurant",
  latitude: 40.73809,
  longitude: -111.8246315,
  notes: "Medieval restaurant from Instagram",
  sourcePlaceId: "gmaps:0x719cd11b4508b814",
  sourceUrl:
    "https://www.google.com/maps/place/Five+Alls+restaurant/data=!4m2!3m1!1s0x87526071ccfff509:0x719cd11b4508b814",
  locationSource: "saved:Want to go",
} as const satisfies Location
