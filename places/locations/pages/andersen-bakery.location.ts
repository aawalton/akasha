import type { Location } from "../location.page-type.ts"

export const andersenBakery = {
  id: "019f1aec-0d7c-7acd-aeac-e0ea19338c2d",
  pageTypeSlug: "location",
  slug: "andersen-bakery",
  title: "Andersen Bakery",
  latitude: 55.6672313,
  longitude: 12.5784845,
  sourcePlaceId: "gmaps:0x421b0fb5b128311",
  sourceUrl:
    "https://www.google.com/maps/place/Andersen+Bakery/data=!4m2!3m1!1s0x4652530d731eb667:0x421b0fb5b128311",
  locationSource: "saved:Denmark",
} as const satisfies Location
