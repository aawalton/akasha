import type { Location } from "../location.page-type.ts"

export const theBayou = {
  id: "019f1aec-0cc6-71fd-8aef-6622006b7170",
  pageTypeSlug: "location",
  slug: "the-bayou",
  title: "The Bayou",
  latitude: 43.92219,
  longitude: -85.2171966,
  sourcePlaceId: "gmaps:0x521db3f6bd2f9980",
  sourceUrl:
    "https://www.google.com/maps/place/The+Bayou/data=!4m2!3m1!1s0x8752f5166a6e2a4b:0x521db3f6bd2f9980",
  locationSource: "saved:Want to go; saved:Favorite places",
} as const satisfies Location
