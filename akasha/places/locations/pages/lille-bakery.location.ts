import type { Location } from "../location.page-type.ts"

export const lilleBakery = {
  id: "019f1aec-0d7a-74eb-8ce0-93a24ac49fc2",
  pageTypeSlug: "location",
  slug: "lille-bakery",
  title: "Lille Bakery",
  latitude: 55.6900933,
  longitude: 12.6130934,
  sourcePlaceId: "gmaps:0x693ad6221060e039",
  sourceUrl:
    "https://www.google.com/maps/place/Lille+Bakery/data=!4m2!3m1!1s0x465252d7c892c54f:0x693ad6221060e039",
  locationSource: "saved:Denmark",
} as const satisfies Location
