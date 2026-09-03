import type { Location } from "../location.page-type.ts"

export const mckinneys = {
  id: "019f1aec-0f2a-73be-b91f-153ea64068db",
  pageTypeSlug: "location",
  slug: "mckinneys",
  title: "McKinney’s",
  address: "1174 W 120 N, Mapleton, UT 84664, USA",
  latitude: 40.1314762,
  longitude: -111.5931763,
  sourcePlaceId: "takeout:mckinney-s:1174-w-120-n-mapleton-ut-84664-usa",
  locationSource: "labeled",
} as const satisfies Location
