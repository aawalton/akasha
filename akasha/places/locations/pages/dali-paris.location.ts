import type { Location } from "../location.page-type.ts"

export const daliParis = {
  id: "019f1aec-0dc7-7ba4-8ff7-d5a18f076e08",
  pageTypeSlug: "location",
  slug: "dali-paris",
  title: "Dalí Paris",
  latitude: 48.8634697,
  longitude: 2.3135181,
  sourcePlaceId: "gmaps:0xef88ab04490097e9",
  sourceUrl:
    "https://www.google.com/maps/place/Dal%C3%AD+Paris/data=!4m2!3m1!1s0x47e66e44ca858f05:0xef88ab04490097e9",
  locationSource: "saved:Paris, France",
} as const satisfies Location
