import type { Location } from "../location.page-type.ts"

export const knoops = {
  id: "019f1aec-0e76-7ea8-826d-36d1e177721e",
  pageTypeSlug: "location",
  slug: "knoops",
  title: "Knoops",
  latitude: 51.5019338,
  longitude: -0.1914531,
  notes: "Recommended by cake by Courtney for hot chocolate. Lots of locations in England",
  sourcePlaceId: "gmaps:0x597849085e5db93c",
  sourceUrl:
    "https://www.google.com/maps/place/Knoops/data=!4m2!3m1!1s0x487605b9065c2199:0x597849085e5db93c",
  locationSource: "saved:London, England",
} as const satisfies Location
