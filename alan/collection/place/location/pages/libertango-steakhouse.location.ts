import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const libertangoSteakhouse = {
  id: "019f1aec-0d1d-73ea-b858-ab469e0c137f",
  type: "page-type/location",
  slug: "libertango-steakhouse",
  title: "Libertango Steakhouse",
  latitude: 40.5625748,
  longitude: -111.8899643,
  notes: "Fancy steak house",
  sourcePlaceId: "gmaps:0x38221fa0921fa0e3",
  sourceUrl:
    "https://www.google.com/maps/place/Libertango+Steakhouse/data=!4m2!3m1!1s0x875287b798875b8f:0x38221fa0921fa0e3",
  locationSource: "saved:Want to go",
  createdAt: "2026-06-30T23:45:05.309Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
