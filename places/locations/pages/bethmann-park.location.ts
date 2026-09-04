import type { Location } from "../location.page-type.ts"

export const bethmannPark = {
  id: "019f1aec-0e91-72fa-a5a8-7b228887079d",
  pageTypeSlug: "location",
  slug: "bethmann-park",
  title: "Bethmann Park",
  latitude: 50.1190271,
  longitude: 8.6916186,
  sourcePlaceId: "gmaps:0x8f32e545e53b1cec",
  sourceUrl:
    "https://www.google.com/maps/place/Bethmann+Park/data=!4m2!3m1!1s0x47bd0ebc8f2f7b5d:0x8f32e545e53b1cec",
  locationSource: "saved:Frankfurt, Germany",
} as const satisfies Location
