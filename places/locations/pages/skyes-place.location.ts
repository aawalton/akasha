import type { Location } from "akasha/places/locations/location.page-type.types.ts"

export const skyesPlace = {
  id: "019f1aec-0f41-7e05-b0d6-1960494d6bf6",
  type: "location",
  slug: "skyes-place",
  title: "Skye’s place",
  address: "19829 SE 316th Pl, Kent, WA 98042, USA",
  latitude: 47.3162599,
  longitude: -122.0778031,
  sourcePlaceId: "takeout:skye-s-place:19829-se-316th-pl-kent-wa-98042-usa",
  locationSource: "labeled",
} as const satisfies Location
