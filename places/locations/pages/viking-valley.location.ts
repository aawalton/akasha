import type { Location } from "../location.page-type.ts"

export const vikingValley = {
  id: "019f1aec-0ee7-76af-bad9-33fc5899028d",
  pageTypeSlug: "location",
  slug: "viking-valley",
  title: "Viking Valley",
  latitude: 60.8792298,
  longitude: 6.8421644,
  sourcePlaceId: "gmaps:0xbdd298e96f2d6f4",
  sourceUrl:
    "https://www.google.com/maps/place/Viking+Valley/data=!4m2!3m1!1s0x463e0963858c0545:0xbdd298e96f2d6f4",
  locationSource: "saved:Norway",
} as const satisfies Location
