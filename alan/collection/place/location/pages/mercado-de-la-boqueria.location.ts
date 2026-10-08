import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const mercadoDeLaBoqueria = {
  id: "019f1b49-55c3-7af4-b5e7-4d5869daf2d4",
  type: "page-type/location",
  slug: "mercado-de-la-boqueria",
  title: "Mercado de La Boqueria",
  latitude: 39.4617322,
  longitude: -0.3839662,
  sourcePlaceId: "gmaps:0x860ac654dc73add5",
  sourceUrl:
    "https://www.google.com/maps/place/Mercado+de+La+Boqueria/data=!4m2!3m1!1s0x12a4a2f7b51e5a01:0x860ac654dc73add5",
  locationSource: "saved:Barcelona, Spain",
  createdAt: "2026-07-01T01:26:58.755Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
