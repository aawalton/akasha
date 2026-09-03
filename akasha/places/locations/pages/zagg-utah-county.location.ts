import type { Location } from "../location.page-type.ts"

export const zaggUtahCounty = {
  id: "019f322c-9ca3-7c43-8c14-143e33769ba4",
  pageTypeSlug: "location",
  slug: "zagg-utah-county",
  title: "ZAGG (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:zagg:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
