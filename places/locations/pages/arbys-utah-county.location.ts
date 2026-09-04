import type { Location } from "../location.page-type.ts"

export const arbysUtahCounty = {
  id: "019f322c-913c-70df-8f8f-3f4634a7dbfc",
  pageTypeSlug: "location",
  slug: "arbys-utah-county",
  title: "Arby's (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:arbys:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
