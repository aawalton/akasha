import type { Location } from "../location.page-type.ts"

export const corvetteDiner = {
  id: "019f1aec-0e5c-742b-841d-1f19f5c4feb0",
  pageTypeSlug: "location",
  slug: "corvette-diner",
  title: "Corvette Diner",
  latitude: 32.7417248,
  longitude: -117.2097429,
  sourcePlaceId: "gmaps:0x76803752ce827901",
  sourceUrl:
    "https://www.google.com/maps/place/Corvette+Diner/data=!4m2!3m1!1s0x80deab0339f548b1:0x76803752ce827901",
  locationSource: "saved:CA, San Diego",
} as const satisfies Location
