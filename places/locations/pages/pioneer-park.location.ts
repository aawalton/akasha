import type { Location } from "../location.page-type.ts"

export const pioneerPark = {
  id: "019f1aec-0e85-7fb7-be39-dd839a877e1e",
  pageTypeSlug: "location",
  slug: "pioneer-park",
  title: "Pioneer Park",
  latitude: 37.1158002,
  longitude: -113.5769877,
  sourcePlaceId: "gmaps:0xfabbdfd3c4c625",
  sourceUrl:
    "https://www.google.com/maps/place/Pioneer+Park/data=!4m2!3m1!1s0x80ca44cbe9b30605:0xfabbdfd3c4c625",
  locationSource: "saved:UT, St. George",
} as const satisfies Location
