import type { Location } from "../location.page-type.ts"

export const mcdonaldsProvo = {
  id: "019f322c-9aa6-7d4c-a19e-fb1efdc5c761",
  pageTypeSlug: "location",
  slug: "mcdonalds-provo",
  title: "McDonald's (Provo)",
  address: "Provo, UT",
  collection: "starving-student-card",
  latitude: 40.2172345,
  longitude: -111.6583911,
  sourcePlaceId: "ssc:loc:mcdonalds:provo",
  locationSource: "starving-student-card",
} as const satisfies Location
