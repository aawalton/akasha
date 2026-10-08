import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const seattleAirbnb = {
  id: "019f1aec-0f48-7b7a-b99f-bb69a049859d",
  type: "page-type/location",
  slug: "seattle-airbnb",
  title: "Seattle airbnb",
  address: "7500 11th Ave NW, Seattle, WA 98117, USA",
  latitude: 47.6834159,
  longitude: -122.3700803,
  sourcePlaceId: "takeout:seattle-airbnb:7500-11th-ave-nw-seattle-wa-98117-usa",
  locationSource: "labeled",
  createdAt: "2026-06-30T23:45:05.864Z",
  updatedAt: "2026-09-15T17:21:46.000Z",
} as const satisfies Location
