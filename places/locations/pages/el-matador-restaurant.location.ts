import type { Location } from "../location.page-type.ts"

export const elMatadorRestaurant = {
  id: "019f1b49-54dd-71b7-9d9d-59ab834aca3e",
  pageTypeSlug: "location",
  slug: "el-matador-restaurant",
  title: "El Matador Restaurant",
  latitude: 34.9569602,
  longitude: -85.2583312,
  notes:
    "Queso dip, and chile rellenos was amazing. So cheesy. (I called and they stuff the poblano with mild cheddar and Monterey Jack)",
  sourcePlaceId: "gmaps:0x7618fb48f61dad6",
  sourceUrl:
    "https://www.google.com/maps/place/El+Matador+Restaurant/data=!4m2!3m1!1s0x8752f7f2d4ca54ef:0x7618fb48f61dad6",
  locationSource: "saved:UT, SLC",
} as const satisfies Location
