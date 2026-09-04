import type { Location } from "../location.page-type.ts"

export const legatoGelato = {
  id: "019f1aec-0df9-76e2-bf26-b23abea9588b",
  pageTypeSlug: "location",
  slug: "legato-gelato",
  title: "Legato Gelato",
  latitude: 36.1429734,
  longitude: -86.7917438,
  sourcePlaceId: "gmaps:0x3017c9c07821040b",
  sourceUrl:
    "https://www.google.com/maps/place/Legato+Gelato/data=!4m2!3m1!1s0x886466853446d933:0x3017c9c07821040b",
  locationSource: "saved:Nashville, Tennessee",
} as const satisfies Location
