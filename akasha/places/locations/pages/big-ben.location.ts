import type { Location } from "../location.page-type.ts"

export const bigBen = {
  id: "019f1aec-0e7e-784e-b527-0fdb440b112c",
  pageTypeSlug: "location",
  slug: "big-ben",
  title: "Big Ben",
  latitude: 51.5007042,
  longitude: -0.1245721,
  sourcePlaceId: "gmaps:0xb78f2474b9a45aa9",
  sourceUrl:
    "https://www.google.com/maps/place/Big+Ben/data=!4m2!3m1!1s0x487604c38c8cd1d9:0xb78f2474b9a45aa9",
  locationSource: "saved:London, England",
} as const satisfies Location
