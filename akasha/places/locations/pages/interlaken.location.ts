import type { Location } from "../location.page-type.ts"

export const interlaken = {
  id: "019f1aec-0f08-7680-8770-5a88db5688d3",
  pageTypeSlug: "location",
  slug: "interlaken",
  title: "Interlaken",
  latitude: 46.6855231,
  longitude: 7.8585139,
  notes: "Recommended by Melissa",
  sourcePlaceId: "gmaps:0x9c111af14c02be00",
  sourceUrl:
    "https://www.google.com/maps/place/Interlaken/data=!4m2!3m1!1s0x1453996a31921a05:0x9c111af14c02be00",
  locationSource: "saved:Switzerland",
} as const satisfies Location
