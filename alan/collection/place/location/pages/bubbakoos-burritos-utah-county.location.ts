import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const bubbakoosBurritosUtahCounty = {
  id: "019f322c-91bb-71a7-8e89-39c2bd944cf7",
  type: "page-type/location",
  slug: "bubbakoos-burritos-utah-county",
  title: "Bubbakoo's Burritos (Utah County)",
  address: "Utah County, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:bubbakoos-burritos:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
