import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const silverStarCafe = {
  id: "019f1b49-5717-71dd-b76a-99722afbb3e6",
  type: "page-type/location",
  slug: "silver-star-cafe",
  title: "Silver Star Cafe",
  latitude: 40.6550091,
  longitude: -111.5190617,
  notes: "I think Marquie and I ate here before and liked it.",
  sourcePlaceId: "gmaps:0x55b7006e478b42b3",
  sourceUrl:
    "https://www.google.com/maps/place/Silver+Star+Cafe/data=!4m2!3m1!1s0x87526d7bde61bc99:0x55b7006e478b42b3",
  locationSource: "saved:UT, Heber City",
  createdAt: "2026-07-01T01:26:59.095Z",
  updatedAt: "2026-09-15T17:21:46.000Z",
} as const satisfies Location
