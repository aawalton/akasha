import type { Location } from "../location.page-type.ts"

export const kingsGarden = {
  id: "019f1aec-0e0f-7a35-8532-d99610b6d471",
  pageTypeSlug: "location",
  slug: "kings-garden",
  title: "King's Garden",
  latitude: 59.3317431,
  longitude: 18.0712889,
  sourcePlaceId: "gmaps:0x1df0a2acc2aa00fc",
  sourceUrl:
    "https://www.google.com/maps/place/King's+Garden/data=!4m2!3m1!1s0x465f9d5945458205:0x1df0a2acc2aa00fc",
  locationSource: "saved:Sweden",
} as const satisfies Location
