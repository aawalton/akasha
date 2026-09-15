import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const wendysOrem = {
  id: "019f322c-9c77-79f3-9d08-3d3218da4a26",
  type: "page-type/location",
  slug: "wendys-orem",
  title: "Wendy's (Orem)",
  address: "Orem, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.3154043,
  longitude: -111.7035835,
  sourcePlaceId: "ssc:loc:wendys:orem",
  locationSource: "starving-student-card",
} as const satisfies Location
