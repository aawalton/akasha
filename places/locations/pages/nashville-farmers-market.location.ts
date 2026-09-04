import type { Location } from "../location.page-type.ts"

export const nashvilleFarmersMarket = {
  id: "019f1b49-5483-745f-8a6d-77e801287225",
  pageTypeSlug: "location",
  slug: "nashville-farmers-market",
  title: "Nashville Farmers' Market",
  latitude: 36.1622767,
  longitude: -86.7742984,
  sourcePlaceId: "gmaps:0x4b3b48b1e51e2914",
  sourceUrl:
    "https://www.google.com/maps/place/Nashville+Farmers'+Market/data=!4m2!3m1!1s0x88646719418ff6cd:0x4b3b48b1e51e2914",
  locationSource: "saved:Nashville, Tennessee",
} as const satisfies Location
