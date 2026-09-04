import type { Location } from "../location.page-type.ts"

export const theParthenon = {
  id: "019f1b49-5475-769f-9d9b-42720fcd0009",
  pageTypeSlug: "location",
  slug: "the-parthenon",
  title: "The Parthenon",
  latitude: 36.149809,
  longitude: -86.813222,
  sourcePlaceId: "gmaps:0x70f4d37bc63ae1a6",
  sourceUrl:
    "https://www.google.com/maps/place/The+Parthenon/data=!4m2!3m1!1s0x8864614bd6f28fe5:0x70f4d37bc63ae1a6",
  locationSource: "saved:Nashville, Tennessee",
} as const satisfies Location
