import type { Location } from "../location.page-type.ts"

export const artesianWellPark = {
  id: "019f1aec-0cf5-76f0-9ae3-19733bb49115",
  pageTypeSlug: "location",
  slug: "artesian-well-park",
  title: "Artesian Well Park",
  latitude: 40.7517178,
  longitude: -111.8770544,
  notes: "Freshwater well",
  sourcePlaceId: "gmaps:0x7fb489937bebc988",
  sourceUrl:
    "https://www.google.com/maps/place/Artesian+Well+Park/data=!4m2!3m1!1s0x8752f541250c1ac5:0x7fb489937bebc988",
  locationSource: "saved:Want to go",
} as const satisfies Location
