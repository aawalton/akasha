import type { Location } from "akasha/places/locations/location.page-type.types.ts"

export const chomUtahCounty = {
  id: "019f322c-92c3-7ffd-9730-18e856fae7f5",
  type: "location",
  slug: "chom-utah-county",
  title: "CHOM (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:chom:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
