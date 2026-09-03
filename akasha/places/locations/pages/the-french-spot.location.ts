import type { Location } from "../location.page-type.ts"

export const theFrenchSpot = {
  id: "019f1aec-0ea0-7dff-9e68-9cb8a9c8dc22",
  pageTypeSlug: "location",
  slug: "the-french-spot",
  title: "The French Spot",
  latitude: 37.6766831,
  longitude: -113.0619761,
  sourcePlaceId: "gmaps:0x8913f554a020de31",
  sourceUrl:
    "https://www.google.com/maps/place/The+French+Spot/data=!4m2!3m1!1s0x80b561ba40be119b:0x8913f554a020de31",
  locationSource: "saved:UT, Cedar City",
} as const satisfies Location
