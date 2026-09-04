import type { Location } from "../location.page-type.ts"

export const walmart = {
  id: "019f1b49-52c4-729a-8bab-bec7f46cb7a3",
  pageTypeSlug: "location",
  slug: "walmart",
  title: "Walmart",
  latitude: 21.3076625,
  longitude: -157.8597669,
  sourcePlaceId: "gmaps:0x1517f2b0e18a4863",
  sourceUrl:
    "https://www.google.com/maps/place/Walmart/data=!4m2!3m1!1s0x7c006e74884c7a77:0x1517f2b0e18a4863",
  locationSource: "saved:Oahu, Hawaii",
} as const satisfies Location
