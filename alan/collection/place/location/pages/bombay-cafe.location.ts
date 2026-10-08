import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const bombayCafe = {
  id: "019f1aec-0e98-7f09-a431-eb063b205bc7",
  type: "page-type/location",
  slug: "bombay-cafe",
  title: "Bombay Cafe",
  latitude: 37.6785733,
  longitude: -113.0615836,
  sourcePlaceId: "gmaps:0xd8c49ad0cc248587",
  sourceUrl:
    "https://www.google.com/maps/place/Bombay+Cafe/data=!4m2!3m1!1s0x80b561ba644d846b:0xd8c49ad0cc248587",
  locationSource: "saved:UT, Cedar City",
  createdAt: "2026-06-30T23:45:05.688Z",
  updatedAt: "2026-09-15T17:20:00.000Z",
} as const satisfies Location
