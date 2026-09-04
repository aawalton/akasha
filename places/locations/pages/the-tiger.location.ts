import type { Location } from "../location.page-type.ts"

export const theTiger = {
  id: "019f1aec-0ee3-796a-b048-1b5a7f4358b0",
  pageTypeSlug: "location",
  slug: "the-tiger",
  title: "The Tiger",
  latitude: 59.9111483,
  longitude: 10.7503161,
  sourcePlaceId: "gmaps:0x49cea522008fb7f9",
  sourceUrl:
    "https://www.google.com/maps/place/The+Tiger/data=!4m2!3m1!1s0x46416ddbeb257ab1:0x49cea522008fb7f9",
  locationSource: "saved:Norway",
} as const satisfies Location
