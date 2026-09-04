import type { Location } from "../location.page-type.ts"

export const cloudGate = {
  id: "019f1aec-0eb4-7cf1-bf24-0f2d8f9c3b03",
  pageTypeSlug: "location",
  slug: "cloud-gate",
  title: "Cloud Gate",
  latitude: 41.8826813,
  longitude: -87.6233399,
  sourcePlaceId: "gmaps:0x64d3fefce3a4a51",
  sourceUrl:
    "https://www.google.com/maps/place/Cloud+Gate/data=!4m2!3m1!1s0x880e2ca687332bf5:0x64d3fefce3a4a51",
  locationSource: "saved:IL, Chicago",
} as const satisfies Location
