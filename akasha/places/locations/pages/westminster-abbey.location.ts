import type { Location } from "../location.page-type.ts"

export const westminsterAbbey = {
  id: "019f1aec-0e80-7fcc-b52c-edc63424eb44",
  pageTypeSlug: "location",
  slug: "westminster-abbey",
  title: "Westminster Abbey",
  latitude: 51.499399,
  longitude: -0.127391,
  sourcePlaceId: "gmaps:0x700da0b0ccd9ee00",
  sourceUrl:
    "https://www.google.com/maps/place/Westminster+Abbey/data=!4m2!3m1!1s0x487604c359914745:0x700da0b0ccd9ee00",
  locationSource: "saved:London, England",
} as const satisfies Location
