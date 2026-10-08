import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const airbnb = {
  id: "019f1aec-0f2f-77e3-b72c-98c922d0aa2f",
  type: "page-type/location",
  slug: "airbnb",
  title: "Airbnb",
  address: "4442 41st St, San Diego, CA 92116, USA",
  latitude: 32.7579719,
  longitude: -117.10740009999999,
  sourcePlaceId: "takeout:airbnb:4442-41st-st-san-diego-ca-92116-usa",
  locationSource: "labeled",
  createdAt: "2026-06-30T23:45:05.839Z",
  updatedAt: "2026-09-15T17:20:00.000Z",
} as const satisfies Location
