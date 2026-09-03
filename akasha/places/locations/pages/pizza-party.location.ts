import type { Location } from "../location.page-type.ts"

export const pizzaParty = {
  id: "019f1aec-0d86-7633-bcf4-f28797581427",
  pageTypeSlug: "location",
  slug: "pizza-party",
  title: "Pizza Party",
  latitude: 55.6832707,
  longitude: 12.5739731,
  notes: "Randomly found on map and looks intriguing",
  sourcePlaceId: "gmaps:0xf6898c1ebb7ebf92",
  sourceUrl:
    "https://www.google.com/maps/place/Pizza+Party/data=!4m2!3m1!1s0x465253257f77e05d:0xf6898c1ebb7ebf92",
  locationSource: "saved:Denmark",
} as const satisfies Location
