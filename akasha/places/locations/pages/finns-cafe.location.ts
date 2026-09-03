import type { Location } from "../location.page-type.ts"

export const finnsCafe = {
  id: "019f1b49-54b2-7daf-869a-774177d4e745",
  pageTypeSlug: "location",
  slug: "finns-cafe",
  title: "Finn's Cafe",
  latitude: 40.64094,
  longitude: -111.476897,
  sourcePlaceId: "gmaps:0xae2d873d578b3449",
  sourceUrl:
    "https://www.google.com/maps/place/Finn's+Cafe/data=!4m2!3m1!1s0x87528aa97664c2c9:0xae2d873d578b3449",
  locationSource: "saved:UT, SLC; saved:Sweden",
} as const satisfies Location
