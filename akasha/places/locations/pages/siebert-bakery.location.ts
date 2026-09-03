import type { Location } from "../location.page-type.ts"

export const siebertBakery = {
  id: "019f1aec-0d4f-79c0-844a-895ab8ce0302",
  pageTypeSlug: "location",
  slug: "siebert-bakery",
  title: "Siebert Bakery",
  latitude: 52.5529174,
  longitude: 13.4082514,
  sourcePlaceId: "gmaps:0x3e4ddb92ada51852",
  sourceUrl:
    "https://www.google.com/maps/place/Siebert+Bakery/data=!4m2!3m1!1s0x416521a389116af3:0x3e4ddb92ada51852",
  locationSource: "saved:Berlin, Germany",
} as const satisfies Location
