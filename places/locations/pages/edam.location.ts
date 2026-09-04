import type { Location } from "../location.page-type.ts"

export const edam = {
  id: "019f1aec-0e2b-78f9-aaaa-0d2c5af8d43d",
  pageTypeSlug: "location",
  slug: "edam",
  title: "Edam",
  latitude: 52.5119116,
  longitude: 5.0562845,
  sourcePlaceId: "gmaps:0xde1659be415b4a44",
  sourceUrl:
    "https://www.google.com/maps/place/Edam/data=!4m2!3m1!1s0x47c6037effc9069d:0xde1659be415b4a44",
  locationSource: "saved:Netherlands",
} as const satisfies Location
