import type { Location } from "akasha/places/locations/location.page-type.types.ts"

export const thePlacePizzaUtahCounty = {
  id: "019f322c-9bca-7dbc-812d-05527f6abe93",
  type: "location",
  slug: "the-place-pizza-utah-county",
  title: "The Place Pizza (Utah County)",
  address: "Utah County, UT",
  collection: "starving-student-card",
  latitude: 40.1197,
  longitude: -111.658,
  sourcePlaceId: "ssc:loc:the-place-pizza:utah-county",
  locationSource: "starving-student-card",
} as const satisfies Location
