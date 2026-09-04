import type { Location } from "../location.page-type.ts"

export const jamesHouse = {
  id: "019f1aec-0f3d-7fe7-96a2-fb8cc1bdca54",
  pageTypeSlug: "location",
  slug: "james-house",
  title: "James’ house",
  latitude: 40.284719599999995,
  longitude: -111.7036267,
  sourcePlaceId: "takeout:james-house:40.28472,-111.70363",
  locationSource: "labeled",
} as const satisfies Location
