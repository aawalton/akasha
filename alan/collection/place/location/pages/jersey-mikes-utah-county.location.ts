import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const jerseyMikesUtahCounty = {
  id: "019f322c-98fc-7af8-9e1a-ed5d7407f6d9",
  type: "page-type/location",
  slug: "jersey-mikes-utah-county",
  title: "Jersey Mikes (Utah County)",
  address: "Utah County, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:jersey-mikes:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
