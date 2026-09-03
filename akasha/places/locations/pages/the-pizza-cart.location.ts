import type { Location } from "../location.page-type.ts"

export const thePizzaCart = {
  id: "019f1b49-5652-73ee-ab07-ab54f75dc1e1",
  pageTypeSlug: "location",
  slug: "the-pizza-cart",
  title: "The Pizza Cart",
  latitude: 37.6563477,
  longitude: -113.0832294,
  sourcePlaceId: "gmaps:0x3a4c9df24625fff2",
  sourceUrl:
    "https://www.google.com/maps/place/The+Pizza+Cart/data=!4m2!3m1!1s0x80b561faade69a81:0x3a4c9df24625fff2",
  locationSource: "saved:UT, Cedar City",
} as const satisfies Location
