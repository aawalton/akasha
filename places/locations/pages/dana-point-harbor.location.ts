import type { Location } from "../location.page-type.ts"

export const danaPointHarbor = {
  id: "019f1b49-558b-7ed8-8756-a0d234496a79",
  pageTypeSlug: "location",
  slug: "dana-point-harbor",
  title: "Dana Point Harbor",
  latitude: 33.45975,
  longitude: -117.69561,
  sourcePlaceId: "gmaps:0x401b764516f668df",
  sourceUrl:
    "https://www.google.com/maps/place/Dana+Point+Harbor/data=!4m2!3m1!1s0x80dcf0ff377100f7:0x401b764516f668df",
  locationSource: "saved:CA, San Diego",
} as const satisfies Location
