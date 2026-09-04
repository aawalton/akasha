import type { Location } from "../location.page-type.ts"

export const sonicUtahCounty = {
  id: "019f322c-9b88-7fae-b15e-8b9947745550",
  pageTypeSlug: "location",
  slug: "sonic-utah-county",
  title: "Sonic (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:sonic:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
