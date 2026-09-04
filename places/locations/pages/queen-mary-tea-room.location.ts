import type { Location } from "../location.page-type.ts"

export const queenMaryTeaRoom = {
  id: "019f1aec-0c9f-7b53-a808-cdbad4a33894",
  pageTypeSlug: "location",
  slug: "queen-mary-tea-room",
  title: "Queen Mary Tea Room",
  latitude: 47.6686231,
  longitude: -122.2955921,
  sourcePlaceId: "gmaps:0x89e45be77880a0cf",
  sourceUrl:
    "https://www.google.com/maps/place/Queen+Mary+Tea+Room/data=!4m2!3m1!1s0x54901480b19720ad:0x89e45be77880a0cf",
  locationSource: "saved:Washington State",
} as const satisfies Location
