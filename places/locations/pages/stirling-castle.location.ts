import type { Location } from "../location.page-type.ts"

export const stirlingCastle = {
  id: "019f1aec-0e8a-7fa5-b729-a13ec4c9eed9",
  pageTypeSlug: "location",
  slug: "stirling-castle",
  title: "Stirling Castle",
  latitude: 56.1240308,
  longitude: -3.9480115,
  notes: "Loved the food at the restaurant",
  sourcePlaceId: "gmaps:0x7c5004fb1541fb67",
  sourceUrl:
    "https://www.google.com/maps/place/Stirling+Castle/data=!4m2!3m1!1s0x48886292283cd5a7:0x7c5004fb1541fb67",
  locationSource: "saved:Scotland",
} as const satisfies Location
