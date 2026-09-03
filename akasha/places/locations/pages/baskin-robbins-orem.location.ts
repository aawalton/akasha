import type { Location } from "../location.page-type.ts"

export const baskinRobbinsOrem = {
  id: "019f322c-91a7-7d2d-8748-06f960d85411",
  pageTypeSlug: "location",
  slug: "baskin-robbins-orem",
  title: "Baskin Robbins (Orem)",
  address: "Orem, UT",
  collection: "starving-student-card",
  latitude: 40.3009412,
  longitude: -111.6962662,
  sourcePlaceId: "ssc:loc:baskin-robbins:orem",
  locationSource: "starving-student-card",
} as const satisfies Location
