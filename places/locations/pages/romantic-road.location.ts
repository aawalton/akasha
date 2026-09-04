import type { Location } from "../location.page-type.ts"

export const romanticRoad = {
  id: "019f1aec-0efa-7137-b5d8-417b996fa55a",
  pageTypeSlug: "location",
  slug: "romantic-road",
  title: "Romantic Road",
  latitude: 49.1677574,
  longitude: 10.3311955,
  sourcePlaceId: "gmaps:0x5949060ba19bfb50",
  sourceUrl:
    "https://www.google.com/maps/place/Romantic+Road/data=!4m2!3m1!1s0x47992b9d4649af23:0x5949060ba19bfb50",
  locationSource: "saved:Germany",
} as const satisfies Location
