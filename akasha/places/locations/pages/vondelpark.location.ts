import type { Location } from "../location.page-type.ts"

export const vondelpark = {
  id: "019f1aec-0e44-7172-bac9-8fa2fc3a79b6",
  pageTypeSlug: "location",
  slug: "vondelpark",
  title: "Vondelpark",
  latitude: 52.3571974,
  longitude: 4.864119,
  sourcePlaceId: "gmaps:0x6cd478550520ca35",
  sourceUrl:
    "https://www.google.com/maps/place/Vondelpark/data=!4m2!3m1!1s0x47c609e2c5b47ccf:0x6cd478550520ca35",
  locationSource: "saved:Netherlands",
} as const satisfies Location
