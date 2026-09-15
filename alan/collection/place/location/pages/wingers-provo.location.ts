import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const wingersProvo = {
  id: "019f322c-9c8c-723d-a271-720b70244020",
  type: "page-type/location",
  slug: "wingers-provo",
  title: "Wingers (Provo)",
  address: "Provo, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.217963,
  longitude: -111.662923,
  sourcePlaceId: "ssc:loc:wingers:provo",
  locationSource: "starving-student-card",
} as const satisfies Location
