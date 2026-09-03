import type { Location } from "../location.page-type.ts"

export const salzburg = {
  id: "019f1aec-0f22-7615-9fd9-bd314f210b47",
  pageTypeSlug: "location",
  slug: "salzburg",
  title: "Salzburg",
  latitude: 47.7981346,
  longitude: 13.0464806,
  notes: "Recommended by Melissa. Do salt cave slides",
  sourcePlaceId: "gmaps:0xc1e183a1412af73d",
  sourceUrl:
    "https://www.google.com/maps/place/Salzburg/data=!4m2!3m1!1s0x47769adda908d4b1:0xc1e183a1412af73d",
  locationSource: "saved:Austria",
} as const satisfies Location
