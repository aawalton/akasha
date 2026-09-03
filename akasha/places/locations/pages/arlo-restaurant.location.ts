import type { Location } from "../location.page-type.ts"

export const arloRestaurant = {
  id: "019f1aec-0d12-7151-a123-6506e7066a88",
  pageTypeSlug: "location",
  slug: "arlo-restaurant",
  title: "Arlo Restaurant",
  latitude: 45.4155785,
  longitude: -75.6953485,
  sourcePlaceId: "gmaps:0xa9cde95cf7f8644f",
  sourceUrl:
    "https://www.google.com/maps/place/Arlo+Restaurant/data=!4m2!3m1!1s0x8752f5c61a628917:0xa9cde95cf7f8644f",
  locationSource: "saved:Want to go",
} as const satisfies Location
