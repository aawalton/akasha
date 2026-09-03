import type { Location } from "../location.page-type.ts"

export const kumoCafe = {
  id: "019f1aec-0d17-722e-b063-51922ad9c738",
  pageTypeSlug: "location",
  slug: "kumo-cafe",
  title: "Kumo Cafe",
  latitude: 47.5020332,
  longitude: 19.0501774,
  sourcePlaceId: "gmaps:0x4c33d1379d5b58ef",
  sourceUrl:
    "https://www.google.com/maps/place/Kumo+Cafe/data=!4m2!3m1!1s0x87528b8bf8a63987:0x4c33d1379d5b58ef",
  locationSource: "saved:Want to go",
} as const satisfies Location
