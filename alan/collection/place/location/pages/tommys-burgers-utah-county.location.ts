import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const tommysBurgersUtahCounty = {
  id: "019f322c-9c2f-7f97-98e4-880f4d18b233",
  type: "page-type/location",
  slug: "tommys-burgers-utah-county",
  title: "Tommy's Burgers (Utah County)",
  address: "Utah County, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:tommys-burgers:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
