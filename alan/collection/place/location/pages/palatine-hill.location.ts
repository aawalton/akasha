import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const palatineHill = {
  id: "019f1aec-0dba-711c-9247-d8a445445854",
  type: "page-type/location",
  slug: "palatine-hill",
  title: "Palatine Hill",
  latitude: 41.8893064,
  longitude: 12.4871093,
  sourcePlaceId: "gmaps:0x9d9bf39cc11700c2",
  sourceUrl:
    "https://www.google.com/maps/place/Palatine+Hill/data=!4m2!3m1!1s0x132f61b5a34f37f3:0x9d9bf39cc11700c2",
  locationSource: "saved:Rome, Italy",
  createdAt: "2026-06-30T23:45:05.466Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
