import type { Location } from "../location.page-type.ts"

export const jcwsUtahCounty = {
  id: "019f322c-98b6-778a-9411-40a9dfde725c",
  pageTypeSlug: "location",
  slug: "jcws-utah-county",
  title: "JCW's (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:jcws:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
