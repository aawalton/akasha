import type { Location } from "../location.page-type.ts"

export const parkGuell = {
  id: "019f1aec-0e73-72db-9fb6-43dd0a825eef",
  pageTypeSlug: "location",
  slug: "park-guell",
  title: "Park Güell",
  latitude: 41.4142348,
  longitude: 2.1524576,
  sourcePlaceId: "gmaps:0x899a0ba01aaace58",
  sourceUrl:
    "https://www.google.com/maps/place/Park+G%C3%BCell/data=!4m2!3m1!1s0x12a4a2ae52d441ab:0x899a0ba01aaace58",
  locationSource: "saved:Barcelona, Spain",
} as const satisfies Location
