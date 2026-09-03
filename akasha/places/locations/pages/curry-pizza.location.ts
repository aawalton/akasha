import type { Location } from "../location.page-type.ts"

export const curryPizza = {
  id: "019f1b49-54bd-7231-844a-acc46b8beefc",
  pageTypeSlug: "location",
  slug: "curry-pizza",
  title: "Curry Pizza",
  latitude: 40.7069106,
  longitude: -112.0240211,
  sourcePlaceId: "gmaps:0xf4fae79f425a6279",
  sourceUrl:
    "https://www.google.com/maps/place/Curry+Pizza/data=!4m2!3m1!1s0x8752871f49f4d17f:0xf4fae79f425a6279",
  locationSource: "saved:UT, SLC",
} as const satisfies Location
