import type { Location } from "../location.page-type.ts"

export const sceraUtahCounty = {
  id: "019f322c-9b75-79b6-ad17-4d96a4a1f6fe",
  pageTypeSlug: "location",
  slug: "scera-utah-county",
  title: "SCERA (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:scera:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
