import type { Location } from "../location.page-type.ts"

export const legoHouse = {
  id: "019f1aec-0d92-7b46-85c5-69d39be103e9",
  pageTypeSlug: "location",
  slug: "lego-house",
  title: "LEGO House",
  latitude: 55.7306692,
  longitude: 9.1149604,
  sourcePlaceId: "gmaps:0xe381471b9e657703",
  sourceUrl:
    "https://www.google.com/maps/place/LEGO+House/data=!4m2!3m1!1s0x464b7178cc61342b:0xe381471b9e657703",
  locationSource: "saved:Denmark",
} as const satisfies Location
