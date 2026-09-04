import type { Location } from "../location.page-type.ts"

export const pikePlaceMarket = {
  id: "019f1aec-0ca7-7c18-9fc1-ce44849702c2",
  pageTypeSlug: "location",
  slug: "pike-place-market",
  title: "Pike Place Market",
  latitude: 47.6093968,
  longitude: -122.3414102,
  sourcePlaceId: "gmaps:0x93f18f02f14e0a2c",
  sourceUrl:
    "https://www.google.com/maps/place/Pike+Place+Market/data=!4m2!3m1!1s0x54906bb2f3f5ca3d:0x93f18f02f14e0a2c",
  locationSource: "saved:Washington State",
} as const satisfies Location
