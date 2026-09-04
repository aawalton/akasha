import type { Location } from "../location.page-type.ts"

export const fremontTroll = {
  id: "019f1aec-0c8b-7db6-9ebf-edd10d092055",
  pageTypeSlug: "location",
  slug: "fremont-troll",
  title: "Fremont Troll",
  latitude: 47.6510483,
  longitude: -122.347234,
  sourcePlaceId: "gmaps:0x9ddb04f1ce7199df",
  sourceUrl:
    "https://www.google.com/maps/place/Fremont+Troll/data=!4m2!3m1!1s0x5490150128a784bd:0x9ddb04f1ce7199df",
  locationSource: "saved:Washington State",
} as const satisfies Location
