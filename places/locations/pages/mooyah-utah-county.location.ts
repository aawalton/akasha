import type { Location } from "../location.page-type.ts"

export const mooyahUtahCounty = {
  id: "019f322c-9ac4-7cf9-87ae-d2099489b154",
  pageTypeSlug: "location",
  slug: "mooyah-utah-county",
  title: "Mooyah (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:mooyah:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
