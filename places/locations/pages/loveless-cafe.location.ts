import type { Location } from "../location.page-type.ts"

export const lovelessCafe = {
  id: "019f1aec-0de8-7eba-bb09-e06a3623cac8",
  pageTypeSlug: "location",
  slug: "loveless-cafe",
  title: "Loveless Cafe",
  latitude: 36.0353097,
  longitude: -86.9720441,
  sourcePlaceId: "gmaps:0x954eaa8c1336f2ed",
  sourceUrl:
    "https://www.google.com/maps/place/Loveless+Cafe/data=!4m2!3m1!1s0x88648611e39c5b19:0x954eaa8c1336f2ed",
  locationSource: "saved:Nashville, Tennessee",
} as const satisfies Location
