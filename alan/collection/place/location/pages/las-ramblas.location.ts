import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const lasRamblas = {
  id: "019f1aec-0e6b-7936-a4c9-0fec0f0150a4",
  type: "page-type/location",
  slug: "las-ramblas",
  title: "Las Ramblas",
  latitude: 41.380051,
  longitude: 2.1710093,
  notes: "Promenade that runs all the way to the water front and Columbus statue",
  sourcePlaceId: "gmaps:0xb616b61a5731ea1a",
  sourceUrl:
    "https://www.google.com/maps/place/Las+Ramblas/data=!4m2!3m1!1s0x12a4a3559224fe7d:0xb616b61a5731ea1a",
  locationSource: "saved:Barcelona, Spain",
  createdAt: "2026-06-30T23:45:05.643Z",
  updatedAt: "2026-09-15T17:20:44.000Z",
} as const satisfies Location
