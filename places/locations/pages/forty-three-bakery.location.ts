import type { Location } from "../location.page-type.ts"

export const fortyThreeBakery = {
  id: "019f1aec-0d07-7409-a995-1b5f3cb8ca1f",
  pageTypeSlug: "location",
  slug: "forty-three-bakery",
  title: "Forty Three Bakery",
  latitude: 40.7505859,
  longitude: -111.912318,
  notes: "Delicious looking bakery",
  sourcePlaceId: "gmaps:0x5d0b52753cf71756",
  sourceUrl:
    "https://www.google.com/maps/place/Forty+Three+Bakery/data=!4m2!3m1!1s0x8752f51f4ccada3b:0x5d0b52753cf71756",
  locationSource: "saved:Want to go",
} as const satisfies Location
