import type { Location } from "../location.page-type.ts"

export const aromaCafe = {
  id: "019f1aec-0d15-7ee4-82d0-556aaddc46df",
  pageTypeSlug: "location",
  slug: "aroma-cafe",
  title: "Aroma Cafe",
  latitude: 51.5818872,
  longitude: -0.1576841,
  sourcePlaceId: "gmaps:0x64364f6813f1fe51",
  sourceUrl:
    "https://www.google.com/maps/place/Aroma+Cafe/data=!4m2!3m1!1s0x874da923e49d027b:0x64364f6813f1fe51",
  locationSource: "saved:Want to go",
} as const satisfies Location
