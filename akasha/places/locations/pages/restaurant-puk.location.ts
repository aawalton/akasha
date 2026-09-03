import type { Location } from "../location.page-type.ts"

export const restaurantPuk = {
  id: "019f1aec-0d8f-7118-a602-467e0197e079",
  pageTypeSlug: "location",
  slug: "restaurant-puk",
  title: "Restaurant Puk",
  latitude: 55.6761458,
  longitude: 12.5739423,
  notes: "Get Æbleflæsk (apples & pork with onions)",
  sourcePlaceId: "gmaps:0xfa4906006273e5ec",
  sourceUrl:
    "https://www.google.com/maps/place/Restaurant+Puk/data=!4m2!3m1!1s0x465253117e773ba5:0xfa4906006273e5ec",
  locationSource: "saved:Denmark",
} as const satisfies Location
