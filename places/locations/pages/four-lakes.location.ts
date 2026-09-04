import type { Location } from "../location.page-type.ts"

export const fourLakes = {
  id: "019f1b49-5689-78bb-a842-2755c9987d39",
  pageTypeSlug: "location",
  slug: "four-lakes",
  title: "Four Lakes",
  latitude: 41.7795659,
  longitude: -88.0824811,
  sourcePlaceId: "gmaps:0xc72b694bcfa8f1a3",
  sourceUrl:
    "https://www.google.com/maps/place/Four+Lakes/data=!4m2!3m1!1s0x880e50d7bb2ffa95:0xc72b694bcfa8f1a3",
  locationSource: "saved:IL, Chicago",
} as const satisfies Location
