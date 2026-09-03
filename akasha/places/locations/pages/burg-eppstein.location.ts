import type { Location } from "../location.page-type.ts"

export const burgEppstein = {
  id: "019f1b49-5628-74b5-826f-b3a96e17ed5b",
  pageTypeSlug: "location",
  slug: "burg-eppstein",
  title: "Burg Eppstein",
  latitude: 50.120597,
  longitude: 8.667403,
  notes: "Visited",
  sourcePlaceId: "gmaps:0x4f521376986d0140",
  sourceUrl:
    "https://www.google.com/maps/place/Burg+Eppstein/data=!4m2!3m1!1s0x47bda490d850ba09:0x4f521376986d0140",
  locationSource: "saved:Frankfurt, Germany",
} as const satisfies Location
