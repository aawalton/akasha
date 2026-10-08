import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const meyersDeli = {
  id: "019f1b49-5388-7592-b90b-c3cf03ea0091",
  type: "page-type/location",
  slug: "meyers-deli",
  title: "Meyers Deli",
  latitude: 3.547929,
  longitude: 98.551235,
  notes: "Bakery, especially for Rugbrød  rye bread",
  sourcePlaceId: "gmaps:0x433491c7dcc3be82",
  sourceUrl:
    "https://www.google.com/maps/place/Meyers+Deli/data=!4m2!3m1!1s0x465253a1bd7643df:0x433491c7dcc3be82",
  locationSource: "saved:Denmark",
  createdAt: "2026-07-01T01:26:58.184Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
