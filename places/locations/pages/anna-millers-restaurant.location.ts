import type { Location } from "../location.page-type.ts"

export const annaMillersRestaurant = {
  id: "019f1b49-52b1-7beb-9603-ce6a11dea67e",
  pageTypeSlug: "location",
  slug: "anna-millers-restaurant",
  title: "Anna Miller's Restaurant",
  latitude: 51.2188549,
  longitude: -3.6277441,
  sourcePlaceId: "gmaps:0xc1f1275373913501",
  sourceUrl:
    "https://www.google.com/maps/place/Anna+Miller's+Restaurant/data=!4m2!3m1!1s0x7c0068c806ebb40b:0xc1f1275373913501",
  locationSource: "saved:Oahu, Hawaii",
} as const satisfies Location
