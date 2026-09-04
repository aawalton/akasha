import type { Location } from "../location.page-type.ts"

export const elCamino = {
  id: "019f1aec-0ca5-73b6-a4c8-bbbdc0700e4e",
  pageTypeSlug: "location",
  slug: "el-camino",
  title: "El Camino",
  latitude: 47.6505296,
  longitude: -122.3509101,
  sourcePlaceId: "gmaps:0xf639791e56bd6bd",
  sourceUrl:
    "https://www.google.com/maps/place/El+Camino/data=!4m2!3m1!1s0x5490150747cc571b:0xf639791e56bd6bd",
  locationSource: "saved:Washington State",
} as const satisfies Location
