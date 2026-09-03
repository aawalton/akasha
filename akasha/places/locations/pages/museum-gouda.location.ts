import type { Location } from "../location.page-type.ts"

export const museumGouda = {
  id: "019f1aec-0e4a-761e-8555-96d5877b3743",
  pageTypeSlug: "location",
  slug: "museum-gouda",
  title: "Museum Gouda",
  latitude: 52.0100937,
  longitude: 4.7112301,
  sourcePlaceId: "gmaps:0x389c5559e943b79e",
  sourceUrl:
    "https://www.google.com/maps/place/Museum+Gouda/data=!4m2!3m1!1s0x47c5d402efab4425:0x389c5559e943b79e",
  locationSource: "saved:Netherlands",
} as const satisfies Location
