import type { Location } from "../location.page-type.ts"

export const buckinghamPalace = {
  id: "019f1aec-0e7f-7c00-8c4b-1f33fed40ab5",
  pageTypeSlug: "location",
  slug: "buckingham-palace",
  title: "Buckingham Palace",
  latitude: 51.5008349,
  longitude: -0.1430045,
  sourcePlaceId: "gmaps:0xa26abf514d902a7",
  sourceUrl:
    "https://www.google.com/maps/place/Buckingham+Palace/data=!4m2!3m1!1s0x48760520cd5b5eb5:0xa26abf514d902a7",
  locationSource: "saved:London, England",
} as const satisfies Location
