import type { Location } from "../location.page-type.ts"

export const worldMarket = {
  id: "019f1b49-54b8-7c00-bd1e-302039633a4f",
  pageTypeSlug: "location",
  slug: "world-market",
  title: "World Market",
  latitude: 45.427608,
  longitude: -75.6922149,
  sourcePlaceId: "gmaps:0xa0e866557a0a0af",
  sourceUrl:
    "https://www.google.com/maps/place/World+Market/data=!4m2!3m1!1s0x87526280157e7ab9:0xa0e866557a0a0af",
  locationSource: "saved:UT, SLC",
} as const satisfies Location
