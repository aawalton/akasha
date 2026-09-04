import type { Location } from "../location.page-type.ts"

export const hotel = {
  id: "019f1aec-0f3c-7a9e-8df5-f20afcb74264",
  pageTypeSlug: "location",
  slug: "hotel",
  title: "Hotel",
  address:
    "Residenza delle Arti by Lifestyle Hotel, Piazza Sidney Sonnino, 13, 00154 Roma RM, Italy",
  latitude: 41.8892216,
  longitude: 12.4743883,
  sourcePlaceId:
    "takeout:hotel:residenza-delle-arti-by-lifestyle-hotel-piazza-sidney-sonnino-13-00154-roma-rm-italy",
  locationSource: "labeled",
} as const satisfies Location
