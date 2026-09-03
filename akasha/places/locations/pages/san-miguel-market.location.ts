import type { Location } from "../location.page-type.ts"

export const sanMiguelMarket = {
  id: "019f1b49-533a-7e9a-aff2-92a379bae568",
  pageTypeSlug: "location",
  slug: "san-miguel-market",
  title: "San Miguel Market",
  latitude: 40.38901,
  longitude: -3.649883,
  notes: "Restaurant market, lots of tapas",
  sourcePlaceId: "gmaps:0x162fe6d34dd190e8",
  sourceUrl:
    "https://www.google.com/maps/place/San+Miguel+Market/data=!4m2!3m1!1s0xd42287921196e2d:0x162fe6d34dd190e8",
  locationSource: "saved:Madrid, Spain",
} as const satisfies Location
