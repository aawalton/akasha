import type { Location } from "../location.page-type.ts"

export const allAmericanDiner = {
  id: "019f1aec-0ea2-7e48-9e5c-7283a6b9cd6b",
  pageTypeSlug: "location",
  slug: "all-american-diner",
  title: "All American Diner",
  latitude: 37.6682951,
  longitude: -113.0617546,
  sourcePlaceId: "gmaps:0xbfd3cfe8e7cb7f48",
  sourceUrl:
    "https://www.google.com/maps/place/All+American+Diner/data=!4m2!3m1!1s0x80b561c630f2a519:0xbfd3cfe8e7cb7f48",
  locationSource: "saved:UT, Cedar City",
} as const satisfies Location
