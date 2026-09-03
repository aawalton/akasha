import type { Location } from "../location.page-type.ts"

export const giverny = {
  id: "019f1b49-541a-7809-ab93-1dc29d924c51",
  pageTypeSlug: "location",
  slug: "giverny",
  title: "Giverny",
  latitude: 48.858705,
  longitude: 2.342865,
  sourcePlaceId: "gmaps:0x40c14484fbba300",
  sourceUrl:
    "https://www.google.com/maps/place/Giverny/data=!4m2!3m1!1s0x47e6c8e2b4ec4081:0x40c14484fbba300",
  locationSource: "saved:Paris, France",
} as const satisfies Location
