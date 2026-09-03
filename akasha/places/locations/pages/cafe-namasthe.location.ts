import type { Location } from "../location.page-type.ts"

export const cafeNamasthe = {
  id: "019f1aec-0e05-7c0f-ae12-0e9cee63d241",
  pageTypeSlug: "location",
  slug: "cafe-namasthe",
  title: "Cafe Namasthe",
  latitude: 40.3874428,
  longitude: -111.8272935,
  notes:
    "I did not like my normal self. But I loved the stuffed cheese and onion bread and the kabobs.",
  sourcePlaceId: "gmaps:0x1e9110da58da159a",
  sourceUrl:
    "https://www.google.com/maps/place/Cafe+Namasthe/data=!4m2!3m1!1s0x874d81f5280f5ad1:0x1e9110da58da159a",
  locationSource: "saved:UT, Utah County",
} as const satisfies Location
