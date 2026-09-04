import type { Location } from "../location.page-type.ts"

export const bombayCafe = {
  id: "019f1aec-0e98-7f09-a431-eb063b205bc7",
  pageTypeSlug: "location",
  slug: "bombay-cafe",
  title: "Bombay Cafe",
  latitude: 37.6785733,
  longitude: -113.0615836,
  sourcePlaceId: "gmaps:0xd8c49ad0cc248587",
  sourceUrl:
    "https://www.google.com/maps/place/Bombay+Cafe/data=!4m2!3m1!1s0x80b561ba644d846b:0xd8c49ad0cc248587",
  locationSource: "saved:UT, Cedar City",
} as const satisfies Location
