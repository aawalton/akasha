import type { Restaurant } from "../restaurant.page-type.types.ts"

export const aubergene = {
  id: "01a06808-a2ec-7001-bbba-7c14b16d57e4",
  pageTypeSlug: "restaurant",
  type: "restaurant",
  slug: "aubergene",
  title: "Aubergene",
  partOfCollections: ["provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  rank: "A",
} as const satisfies Restaurant
