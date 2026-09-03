import type { Location } from "../location.page-type.ts"

export const groerTiergarten = {
  id: "019f1aec-0d5b-7395-b4c7-f6287b3cc60b",
  pageTypeSlug: "location",
  slug: "groer-tiergarten",
  title: "Großer Tiergarten",
  latitude: 52.5163027,
  longitude: 13.3618184,
  sourcePlaceId: "gmaps:0x83c392f1dcd0ab7a",
  sourceUrl:
    "https://www.google.com/maps/place/Gro%C3%9Fer+Tiergarten/data=!4m2!3m1!1s0x47a851ae4addd1e1:0x83c392f1dcd0ab7a",
  locationSource: "saved:Berlin, Germany",
} as const satisfies Location
