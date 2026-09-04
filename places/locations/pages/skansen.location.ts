import type { Location } from "../location.page-type.ts"

export const skansen = {
  id: "019f1aec-0e09-7821-be2d-a90f66cb947c",
  pageTypeSlug: "location",
  slug: "skansen",
  title: "Skansen",
  latitude: 59.3266228,
  longitude: 18.1052823,
  notes: "Recommended by Melissa",
  sourcePlaceId: "gmaps:0x2c35b6cfd6468531",
  sourceUrl: "https://www.google.com/maps/place/Skansen/data=!4m2!3m1!1s0x0:0x2c35b6cfd6468531",
  locationSource: "saved:Sweden",
} as const satisfies Location
