import type { Location } from "../location.page-type.ts"

export const lamysMexicanFood = {
  id: "019f1b49-5604-7e4f-9561-d338ff865ff5",
  pageTypeSlug: "location",
  slug: "lamys-mexican-food",
  title: "Lamy's Mexican Food",
  latitude: 40.636782,
  longitude: -74.085857,
  sourcePlaceId: "gmaps:0x110662c3ed982a81",
  sourceUrl:
    "https://www.google.com/maps/place/Lamy's+Mexican+Food/data=!4m2!3m1!1s0x80ca456a51cd1287:0x110662c3ed982a81",
  locationSource: "saved:UT, St. George",
} as const satisfies Location
