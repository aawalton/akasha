import type { Location } from "../location.page-type.ts"

export const hyttefadet = {
  id: "019f1aec-0d79-70a4-b012-9f16c7f8413a",
  pageTypeSlug: "location",
  slug: "hyttefadet",
  title: "Hyttefadet",
  latitude: 57.0242213,
  longitude: 9.690524,
  notes:
    "Everything was prepared exceptionally well. \nGreat place to try the dish, classic crispy pork. The beef tenderloin and apples tart were also delicious.",
  sourcePlaceId: "gmaps:0x7aa39951e8a63be3",
  sourceUrl:
    "https://www.google.com/maps/place/Hyttefadet/data=!4m2!3m1!1s0x46525322b43901d5:0x7aa39951e8a63be3",
  locationSource: "saved:Denmark",
} as const satisfies Location
