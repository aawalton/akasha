import type { Location } from "../location.page-type.ts"

export const stockholmsCentralstation = {
  id: "019f1aec-0e12-719d-8a4d-9ac5689f8691",
  pageTypeSlug: "location",
  slug: "stockholms-centralstation",
  title: "Stockholms Centralstation",
  latitude: 59.3301497,
  longitude: 18.0582101,
  sourcePlaceId: "gmaps:0x6aa646c4a2f92ac",
  sourceUrl:
    "https://www.google.com/maps/place/Stockholms+Centralstation/data=!4m2!3m1!1s0x465f9d5ca75686c9:0x6aa646c4a2f92ac",
  locationSource: "saved:Sweden",
} as const satisfies Location
