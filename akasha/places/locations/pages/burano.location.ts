import type { Location } from "../location.page-type.ts"

export const burano = {
  id: "019f1aec-0e1e-7ba9-8a38-2f25531bd2d0",
  pageTypeSlug: "location",
  slug: "burano",
  title: "Burano",
  latitude: 45.4853558,
  longitude: 12.4175384,
  sourcePlaceId: "gmaps:0x7dc660c352b117d2",
  sourceUrl:
    "https://www.google.com/maps/place/Burano/data=!4m2!3m1!1s0x477eac52f73090a5:0x7dc660c352b117d2",
  locationSource: "saved:Venice, Italy",
} as const satisfies Location
