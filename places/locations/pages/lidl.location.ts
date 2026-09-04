import type { Location } from "../location.page-type.ts"

export const lidl = {
  id: "019f1aec-0d64-739d-8651-d92e3db57661",
  pageTypeSlug: "location",
  slug: "lidl",
  title: "Lidl",
  latitude: 53.3731747,
  longitude: -6.2854336,
  sourcePlaceId: "gmaps:0x8340f30686f33ece",
  sourceUrl:
    "https://www.google.com/maps/place/Lidl/data=!4m2!3m1!1s0x485c49664d5a4cb3:0x8340f30686f33ece",
  locationSource: "saved:Ireland",
} as const satisfies Location
