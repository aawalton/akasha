import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const vikingValley = {
  id: "019f1aec-0ee7-76af-bad9-33fc5899028d",
  type: "page-type/location",
  slug: "viking-valley",
  title: "Viking Valley",
  latitude: 60.8792298,
  longitude: 6.8421644,
  sourcePlaceId: "gmaps:0xbdd298e96f2d6f4",
  sourceUrl:
    "https://www.google.com/maps/place/Viking+Valley/data=!4m2!3m1!1s0x463e0963858c0545:0xbdd298e96f2d6f4",
  locationSource: "saved:Norway",
  createdAt: "2026-06-30T23:45:05.767Z",
  updatedAt: "2026-09-15T17:22:08.000Z",
} as const satisfies Location
