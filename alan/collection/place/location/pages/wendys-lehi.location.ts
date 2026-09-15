import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const wendysLehi = {
  id: "019f322c-9c74-76f9-a23a-f772afd95efb",
  type: "page-type/location",
  slug: "wendys-lehi",
  title: "Wendy's (Lehi)",
  address: "Lehi, UT",
  collection: "location-collection/starving-student-card",
  latitude: 40.4303973,
  longitude: -111.8859869,
  sourcePlaceId: "ssc:loc:wendys:lehi",
  locationSource: "starving-student-card",
} as const satisfies Location
