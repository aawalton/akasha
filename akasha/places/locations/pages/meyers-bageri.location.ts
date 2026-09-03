import type { Location } from "../location.page-type.ts"

export const meyersBageri = {
  id: "019f1aec-0d8b-75bf-bd41-053eeebe2c4b",
  pageTypeSlug: "location",
  slug: "meyers-bageri",
  title: "Meyers Bageri",
  latitude: 55.6976271,
  longitude: 12.5851983,
  notes: "Bakery, especially for Rugbrød  rye bread",
  sourcePlaceId: "gmaps:0xa16ebb7e074259e",
  sourceUrl:
    "https://www.google.com/maps/place/Meyers+Bageri/data=!4m2!3m1!1s0x465252e476f5fff9:0xa16ebb7e074259e",
  locationSource: "saved:Denmark",
} as const satisfies Location
