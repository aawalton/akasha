import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const mcdonaldsAmericanFork = {
  id: "019f322c-9a4d-70c6-96bf-1ede9ae225c2",
  type: "page-type/location",
  slug: "mcdonalds-american-fork",
  title: "McDonald's (American Fork)",
  address: "American Fork, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.3740364,
  longitude: -111.7875628,
  sourcePlaceId: "ssc:loc:mcdonalds:american-fork",
  locationSource: "starving-student-card",
} as const satisfies Location
