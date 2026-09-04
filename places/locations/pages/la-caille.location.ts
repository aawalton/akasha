import type { Location } from "../location.page-type.ts"

export const laCaille = {
  id: "019f1aec-0d0e-792d-b3ad-c5396728d5db",
  pageTypeSlug: "location",
  slug: "la-caille",
  title: "La Caille",
  latitude: 45.1538009,
  longitude: 5.4615671,
  sourcePlaceId: "gmaps:0xf7d52f151b960c3c",
  sourceUrl:
    "https://www.google.com/maps/place/La+Caille/data=!4m2!3m1!1s0x87527cc3475aa1d7:0xf7d52f151b960c3c",
  locationSource: "saved:Want to go",
} as const satisfies Location
