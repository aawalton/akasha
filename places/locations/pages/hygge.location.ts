import type { Location } from "../location.page-type.ts"

export const hygge = {
  id: "019f1aec-0ed1-7d57-8b11-4bdbd31cbf0b",
  pageTypeSlug: "location",
  slug: "hygge",
  title: "Hygge",
  latitude: 50.8348866,
  longitude: 4.3594074,
  notes: "This place looked nice!",
  sourcePlaceId: "gmaps:0x9582ef3a47c0cffd",
  sourceUrl:
    "https://www.google.com/maps/place/Hygge/data=!4m2!3m1!1s0x47c3c48856a92229:0x9582ef3a47c0cffd",
  locationSource: "saved:Belgium",
} as const satisfies Location
