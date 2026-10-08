import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const plazaMayor = {
  id: "019f1aec-0d6f-7175-9445-ddb7efb463e0",
  type: "page-type/location",
  slug: "plaza-mayor",
  title: "Plaza Mayor",
  latitude: 40.4153949,
  longitude: -3.7069974,
  notes: "Incredible Plaza. Shops on bottom, housing on top",
  sourcePlaceId: "gmaps:0xd202c4f0d67625e8",
  sourceUrl:
    "https://www.google.com/maps/place/Plaza+Mayor/data=!4m2!3m1!1s0xd42287ed85fe0d9:0xd202c4f0d67625e8",
  locationSource: "saved:Madrid, Spain",
  createdAt: "2026-06-30T23:45:05.391Z",
  updatedAt: "2026-09-15T17:21:46.000Z",
} as const satisfies Location
