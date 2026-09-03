import type { Location } from "../location.page-type.ts"

export const slurpUtahCounty = {
  id: "019f322c-9b85-746c-a76c-70a1c2ef315b",
  pageTypeSlug: "location",
  slug: "slurp-utah-county",
  title: "Slurp (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:slurp:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
