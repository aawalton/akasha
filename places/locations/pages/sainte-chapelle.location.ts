import type { Location } from "../location.page-type.ts"

export const sainteChapelle = {
  id: "019f1aec-0dc0-74f0-8665-72f7bfee3e18",
  pageTypeSlug: "location",
  slug: "sainte-chapelle",
  title: "Sainte-Chapelle",
  latitude: 48.8553933,
  longitude: 2.3449941,
  notes:
    "Gorgeous cathedral filled with stained glass windows. Saw a picture of it online and went to go now.",
  sourcePlaceId: "gmaps:0x33f441f9dc242768",
  sourceUrl:
    "https://www.google.com/maps/place/Sainte-Chapelle/data=!4m2!3m1!1s0x47e66e1fd8767d47:0x33f441f9dc242768",
  locationSource: "saved:Paris, France",
} as const satisfies Location
