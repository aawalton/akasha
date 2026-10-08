import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const skansen = {
  id: "019f1aec-0e09-7821-be2d-a90f66cb947c",
  type: "page-type/location",
  slug: "skansen",
  title: "Skansen",
  latitude: 59.3266228,
  longitude: 18.1052823,
  notes: "Recommended by Melissa",
  sourcePlaceId: "gmaps:0x2c35b6cfd6468531",
  sourceUrl: "https://www.google.com/maps/place/Skansen/data=!4m2!3m1!1s0x0:0x2c35b6cfd6468531",
  locationSource: "saved:Sweden",
  createdAt: "2026-06-30T23:45:05.545Z",
  updatedAt: "2026-09-15T17:21:46.000Z",
} as const satisfies Location
