import type { Restaurant } from "../restaurant.page-type.ts"

export const vessel = {
  id: "01a06808-a2ed-7000-8600-f292d1571c62",
  pageTypeSlug: "restaurant",
  slug: "vessel",
  title: "Vessel",
  partOfCollections: ["provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  rank: "B",
} as const satisfies Restaurant
