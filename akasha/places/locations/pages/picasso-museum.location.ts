import type { Location } from "../location.page-type.ts"

export const picassoMuseum = {
  id: "019f1aec-0e6e-7263-a5cf-0a9792781f07",
  pageTypeSlug: "location",
  slug: "picasso-museum",
  title: "Picasso Museum",
  latitude: 41.3851039,
  longitude: 2.1812015,
  sourcePlaceId: "gmaps:0x27011e710700cc63",
  sourceUrl:
    "https://www.google.com/maps/place/Picasso+Museum/data=!4m2!3m1!1s0x12a4a2fe99bce26b:0x27011e710700cc63",
  locationSource: "saved:Barcelona, Spain",
} as const satisfies Location
