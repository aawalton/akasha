import type { Location } from "akasha/alan/collections/places/locations/location.page-type.types.ts"

export const dairyQueenVineyard = {
  id: "019f322c-9479-793e-9537-0efc16f930c8",
  type: "location",
  slug: "dairy-queen-vineyard",
  title: "Dairy Queen (Vineyard)",
  address: "Vineyard, UT",
  collection: "starving-student-card",
  latitude: 40.2975929,
  longitude: -111.734518,
  sourcePlaceId: "ssc:loc:dairy-queen:vineyard",
  locationSource: "starving-student-card",
} as const satisfies Location
