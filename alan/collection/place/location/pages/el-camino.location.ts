import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const elCamino = {
  id: "019f1aec-0ca5-73b6-a4c8-bbbdc0700e4e",
  type: "page-type/location",
  slug: "el-camino",
  title: "El Camino",
  latitude: 47.6505296,
  longitude: -122.3509101,
  sourcePlaceId: "gmaps:0xf639791e56bd6bd",
  sourceUrl:
    "https://www.google.com/maps/place/El+Camino/data=!4m2!3m1!1s0x5490150747cc571b:0xf639791e56bd6bd",
  locationSource: "saved:Washington State",
  createdAt: "2026-06-30T23:45:05.189Z",
  updatedAt: "2026-09-15T17:20:22.000Z",
} as const satisfies Location
