import type { Location } from "../location.page-type.ts"

export const navyPier = {
  id: "019f1aec-0eb2-7dcf-8f3d-8edd5224686a",
  pageTypeSlug: "location",
  slug: "navy-pier",
  title: "Navy Pier",
  latitude: 41.8905809,
  longitude: -87.6122081,
  sourcePlaceId: "gmaps:0xd0acdb96b088a4dc",
  sourceUrl:
    "https://www.google.com/maps/place/Navy+Pier/data=!4m2!3m1!1s0x880e2b4d91f12edb:0xd0acdb96b088a4dc",
  locationSource: "saved:IL, Chicago",
} as const satisfies Location
