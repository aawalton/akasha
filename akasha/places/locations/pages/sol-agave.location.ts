import type { Location } from "../location.page-type.ts"

export const solAgave = {
  id: "019f1aec-0e07-7012-bd86-6cc3a52e8023",
  pageTypeSlug: "location",
  slug: "sol-agave",
  title: "Sol Agave",
  latitude: 40.3784904,
  longitude: -111.819365,
  notes: "Amazing beef",
  sourcePlaceId: "gmaps:0x3a920695a3caae22",
  sourceUrl:
    "https://www.google.com/maps/place/Sol+Agave/data=!4m2!3m1!1s0x874d81d965bac665:0x3a920695a3caae22",
  locationSource: "saved:UT, Utah County",
} as const satisfies Location
