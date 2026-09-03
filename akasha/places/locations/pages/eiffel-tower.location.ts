import type { Location } from "../location.page-type.ts"

export const eiffelTower = {
  id: "019f197c-4b5c-7c8a-8056-927458dcfb86",
  pageTypeSlug: "location",
  slug: "eiffel-tower",
  title: "Eiffel Tower",
  address: "Eiffel Tower, 5 Avenue Anatole France, 75007 Paris, France",
  locationCategory: "amenity",
  latitude: 48.8582599,
  longitude: 2.2945006,
  sourcePlaceId:
    "5112386d21235b024059effbdc75db6d4840f00102f901747f4c0000000000c0020192030c45696666656c20546f776572",
} as const satisfies Location
