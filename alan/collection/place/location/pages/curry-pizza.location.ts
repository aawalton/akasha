import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const curryPizza = {
  id: "019f1b49-54bd-7231-844a-acc46b8beefc",
  type: "page-type/location",
  slug: "curry-pizza",
  title: "Curry Pizza",
  latitude: 40.7069106,
  longitude: -112.0240211,
  sourcePlaceId: "gmaps:0xf4fae79f425a6279",
  sourceUrl:
    "https://www.google.com/maps/place/Curry+Pizza/data=!4m2!3m1!1s0x8752871f49f4d17f:0xf4fae79f425a6279",
  locationSource: "saved:UT, SLC",
  createdAt: "2026-07-01T01:26:58.493Z",
  updatedAt: "2026-09-15T17:20:22.000Z",
} as const satisfies Location
