import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const subZeroIceCreamUtahCounty = {
  id: "019f322c-9b98-7408-8b72-5d515ad685fe",
  type: "page-type/location",
  slug: "sub-zero-ice-cream-utah-county",
  title: "Sub Zero Ice Cream (Utah County)",
  address: "Utah County, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:sub-zero-ice-cream:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
