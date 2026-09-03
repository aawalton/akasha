import type { Location } from "../location.page-type.ts"

export const airBnb = {
  id: "019f1aec-0f4a-70ce-88ca-349d0116e477",
  pageTypeSlug: "location",
  slug: "air-bnb",
  title: "Air BnB",
  address: "55-431 Iosepa St, Laie, HI 96762, USA",
  latitude: 21.6457157,
  longitude: -157.9207152,
  sourcePlaceId: "takeout:air-bnb:55-431-iosepa-st-laie-hi-96762-usa",
  locationSource: "labeled",
} as const satisfies Location
