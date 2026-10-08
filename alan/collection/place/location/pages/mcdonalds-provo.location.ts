import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const mcdonaldsProvo = {
  id: "019f322c-9aa6-7d4c-a19e-fb1efdc5c761",
  type: "page-type/location",
  slug: "mcdonalds-provo",
  title: "McDonald's (Provo)",
  address: "Provo, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.2172345,
  longitude: -111.6583911,
  sourcePlaceId: "ssc:loc:mcdonalds:provo",
  locationSource: "starving-student-card",
  createdAt: "2026-07-05T12:06:51.814Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
