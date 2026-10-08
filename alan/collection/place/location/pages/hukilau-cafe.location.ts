import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const hukilauCafe = {
  id: "019f1b49-52b4-787b-aede-4155b726c028",
  type: "page-type/location",
  slug: "hukilau-cafe",
  title: "Hukilau Cafe",
  latitude: 19.118947,
  longitude: -155.761748,
  sourcePlaceId: "gmaps:0xc56062ce8acd7488",
  sourceUrl:
    "https://www.google.com/maps/place/Hukilau+Cafe/data=!4m2!3m1!1s0x7c00455e2787cc4b:0xc56062ce8acd7488",
  locationSource: "saved:Oahu, Hawaii",
  createdAt: "2026-07-01T01:26:57.972Z",
  updatedAt: "2026-09-15T17:20:44.000Z",
} as const satisfies Location
