import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const sipNUtahCounty = {
  id: "019f322c-9b81-7a26-9258-87b7f5f60314",
  type: "page-type/location",
  slug: "sip-n-utah-county",
  title: "Sip-N (Utah County)",
  address: "Utah County, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:sip-n:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
