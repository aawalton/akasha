import type { Location } from "../location.page-type.ts"

export const miCorazonMexicanRestaurant = {
  id: "019f1aec-0eef-7646-96c5-1c1ce27d5007",
  pageTypeSlug: "location",
  slug: "mi-corazon-mexican-restaurant",
  title: "Mi Corazon Mexican Restaurant",
  latitude: 34.1059082,
  longitude: -118.2728709,
  notes: "Amazing mid-tier Mexican",
  sourcePlaceId: "gmaps:0x69285f0c9127f7b1",
  sourceUrl:
    "https://www.google.com/maps/place/Mi+Corazon+Mexican+Restaurant/data=!4m2!3m1!1s0x874dbdf9bfa9941f:0x69285f0c9127f7b1",
  locationSource: "saved:Favorite places",
} as const satisfies Location
