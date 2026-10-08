import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const rialtoBridge = {
  id: "019f1aec-0e20-705f-88be-ed15c029cb49",
  type: "page-type/location",
  slug: "rialto-bridge",
  title: "Rialto Bridge",
  latitude: 45.4380688,
  longitude: 12.3356548,
  sourcePlaceId: "gmaps:0x732011a1298ecc89",
  sourceUrl:
    "https://www.google.com/maps/place/Rialto+Bridge/data=!4m2!3m1!1s0x477eb1c7faa33a3b:0x732011a1298ecc89",
  locationSource: "saved:Venice, Italy",
  createdAt: "2026-06-30T23:45:05.568Z",
  updatedAt: "2026-09-15T17:21:46.000Z",
} as const satisfies Location
