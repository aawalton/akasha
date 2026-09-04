import type { Location } from "../location.page-type.ts"

export const anniesCafe = {
  id: "019f1aec-0ce8-75f4-9afd-743114fe642d",
  pageTypeSlug: "location",
  slug: "annies-cafe",
  title: "Annie’s Cafe",
  latitude: 38.1815225,
  longitude: -85.7671669,
  notes: "Tea party place?",
  sourcePlaceId: "gmaps:0x64fc4f2f3ed1ed9",
  sourceUrl:
    "https://www.google.com/maps/place/Annie%E2%80%99s+Cafe/data=!4m2!3m1!1s0x8752f718569ee9f7:0x64fc4f2f3ed1ed9",
  locationSource: "saved:Want to go",
} as const satisfies Location
