import type { Location } from "../location.page-type.ts"

export const ikeaCityStockholm = {
  id: "019f1aec-0e13-7977-8bd5-1a5a20bb1af1",
  pageTypeSlug: "location",
  slug: "ikea-city-stockholm",
  title: "IKEA City - Stockholm",
  latitude: 59.3303047,
  longitude: 18.0678222,
  sourcePlaceId: "gmaps:0x66034a60a8bc78f3",
  sourceUrl:
    "https://www.google.com/maps/place/IKEA+City+-+Stockholm/data=!4m2!3m1!1s0x465f9d8d17ea4557:0x66034a60a8bc78f3",
  locationSource: "saved:Sweden",
} as const satisfies Location
