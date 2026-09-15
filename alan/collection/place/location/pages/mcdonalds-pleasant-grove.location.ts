import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const mcdonaldsPleasantGrove = {
  id: "019f322c-9aa1-72fa-ba82-6aa9d7374e11",
  type: "page-type/location",
  slug: "mcdonalds-pleasant-grove",
  title: "McDonald's (Pleasant Grove)",
  address: "Pleasant Grove, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.3548874,
  longitude: -111.7361532,
  sourcePlaceId: "ssc:loc:mcdonalds:pleasant-grove",
  locationSource: "starving-student-card",
} as const satisfies Location
