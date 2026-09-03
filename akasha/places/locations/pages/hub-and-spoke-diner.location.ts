import type { Location } from "../location.page-type.ts"

export const hubAndSpokeDiner = {
  id: "019f1b49-54db-7093-9daa-7584e857feae",
  pageTypeSlug: "location",
  slug: "hub-and-spoke-diner",
  title: "Hub and Spoke Diner",
  latitude: 40.7417598,
  longitude: -111.8593566,
  notes: "Delicious",
  sourcePlaceId: "gmaps:0xf4aff47160bddce4",
  sourceUrl:
    "https://www.google.com/maps/place/Hub+and+Spoke+Diner/data=!4m2!3m1!1s0x8752f5551c58e951:0xf4aff47160bddce4",
  locationSource: "saved:UT, SLC",
} as const satisfies Location
