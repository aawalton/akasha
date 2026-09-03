import type { Location } from "../location.page-type.ts"

export const chocolateBear = {
  id: "019f1b49-57a8-7147-8001-7670ee13391e",
  pageTypeSlug: "location",
  slug: "chocolate-bear",
  title: "Chocolate Bear",
  latitude: 39.297962,
  longitude: -106.417588,
  notes: "Chocolate covered raspberries",
  sourcePlaceId: "gmaps:0xff780c622c23577f",
  sourceUrl:
    "https://www.google.com/maps/place/Chocolate+Bear/data=!4m2!3m1!1s0x87541232cafac4a5:0xff780c622c23577f",
  locationSource: "saved:Bear Lake - Garden City",
} as const satisfies Location
