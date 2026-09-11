import type { Location } from "akasha/places/locations/location.page-type.types.ts"

export const meltyUtahCounty = {
  id: "019f322c-9ab0-7597-82f6-ef2a16a77d57",
  type: "location",
  slug: "melty-utah-county",
  title: "Melty (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:melty:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
