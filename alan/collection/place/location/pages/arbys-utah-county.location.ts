import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const arbysUtahCounty = {
  id: "019f322c-913c-70df-8f8f-3f4634a7dbfc",
  type: "page-type/location",
  slug: "arbys-utah-county",
  title: "Arby's (Utah County)",
  address: "Utah County, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:arbys:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
