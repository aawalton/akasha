import type { Location } from "../location.page-type.ts"

export const wendysProvo = {
  id: "019f322c-9c7a-7d98-8fb8-8ca05cd4c165",
  pageTypeSlug: "location",
  slug: "wendys-provo",
  title: "Wendy's (Provo)",
  address: "Provo, UT",
  collection: "starving-student-card",
  latitude: 40.2503615,
  longitude: -111.6567889,
  sourcePlaceId: "ssc:loc:wendys:provo",
  locationSource: "starving-student-card",
} as const satisfies Location
