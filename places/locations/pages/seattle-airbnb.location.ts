import type { Location } from "../location.page-type.ts"

export const seattleAirbnb = {
  id: "019f1aec-0f48-7b7a-b99f-bb69a049859d",
  pageTypeSlug: "location",
  slug: "seattle-airbnb",
  title: "Seattle airbnb",
  address: "7500 11th Ave NW, Seattle, WA 98117, USA",
  latitude: 47.6834159,
  longitude: -122.3700803,
  sourcePlaceId: "takeout:seattle-airbnb:7500-11th-ave-nw-seattle-wa-98117-usa",
  locationSource: "labeled",
} as const satisfies Location
