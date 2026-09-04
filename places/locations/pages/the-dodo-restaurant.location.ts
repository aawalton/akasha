import type { Location } from "../location.page-type.ts"

export const theDodoRestaurant = {
  id: "019f1aec-0ce6-7051-ba54-fdd956e87788",
  pageTypeSlug: "location",
  slug: "the-dodo-restaurant",
  title: "The Dodo Restaurant",
  latitude: 40.7261685,
  longitude: -111.8520857,
  notes: "Restaurant group. Try the dessert",
  sourcePlaceId: "gmaps:0x2d4396deb77610d1",
  sourceUrl:
    "https://www.google.com/maps/place/The+Dodo+Restaurant/data=!4m2!3m1!1s0x8752601ebc78f39d:0x2d4396deb77610d1",
  locationSource: "saved:Want to go",
} as const satisfies Location
