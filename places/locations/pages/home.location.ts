import type { Location } from "../location.page-type.ts"

export const home = {
  id: "019f1aec-0f26-757d-a377-7800fd0b4f57",
  pageTypeSlug: "location",
  slug: "home",
  title: "Home",
  address: "1350 Apple Ave, Provo, UT 84604, United States",
  latitude: 40.248636399999995,
  longitude: -111.6348074,
  sourcePlaceId: "takeout:home:1350-apple-ave-provo-ut-84604-united-states",
  locationSource: "labeled",
} as const satisfies Location
