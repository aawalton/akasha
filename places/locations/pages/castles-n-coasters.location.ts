import type { Location } from "../location.page-type.ts"

export const castlesNCoasters = {
  id: "019f1aec-0cb9-77b1-aa18-5c797f0ba739",
  pageTypeSlug: "location",
  slug: "castles-n-coasters",
  title: "Castles N' Coasters",
  latitude: 33.572184,
  longitude: -112.1185444,
  sourcePlaceId: "gmaps:0xc7a77ab42dc8679a",
  sourceUrl:
    "https://www.google.com/maps/place/Castles+N'+Coasters/data=!4m2!3m1!1s0x872b1218ffffffff:0xc7a77ab42dc8679a",
  locationSource: "saved:Want to go",
} as const satisfies Location
