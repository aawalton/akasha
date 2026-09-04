import type { Location } from "../location.page-type.ts"

export const etchRestaurant = {
  id: "019f1b49-5460-7ec0-84bf-02cdc8b5667f",
  pageTypeSlug: "location",
  slug: "etch-restaurant",
  title: "Etch Restaurant",
  latitude: 36.1622767,
  longitude: -86.7742984,
  sourcePlaceId: "gmaps:0x5357e1830040fdf5",
  sourceUrl:
    "https://www.google.com/maps/place/Etch+Restaurant/data=!4m2!3m1!1s0x8864665c7b6a796f:0x5357e1830040fdf5",
  locationSource: "saved:Nashville, Tennessee",
} as const satisfies Location
