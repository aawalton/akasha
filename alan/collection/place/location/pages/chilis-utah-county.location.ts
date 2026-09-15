import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const chilisUtahCounty = {
  id: "019f322c-92b8-7096-b542-6f60f0834b6f",
  type: "page-type/location",
  slug: "chilis-utah-county",
  title: "Chili's (Utah County)",
  address: "Utah County, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:chilis:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
