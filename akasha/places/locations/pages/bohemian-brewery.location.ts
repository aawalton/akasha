import type { Location } from "../location.page-type.ts"

export const bohemianBrewery = {
  id: "019f1aec-0ccf-7fcd-921f-a789860a8454",
  pageTypeSlug: "location",
  slug: "bohemian-brewery",
  title: "Bohemian Brewery",
  latitude: 40.6205445,
  longitude: -111.8882204,
  notes: "Restaurant group. German fare",
  sourcePlaceId: "gmaps:0xc8f520637dd2e6d2",
  sourceUrl:
    "https://www.google.com/maps/place/Bohemian+Brewery/data=!4m2!3m1!1s0x875289b3a11310b9:0xc8f520637dd2e6d2",
  locationSource: "saved:Want to go",
} as const satisfies Location
