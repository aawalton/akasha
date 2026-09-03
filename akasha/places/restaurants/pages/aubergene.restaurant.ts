import type { Restaurant } from "../restaurant.page-type.ts"

export const aubergene = {
  id: "01a06808-a2ec-7001-bbba-7c14b16d57e4",
  pageTypeSlug: "restaurant",
  slug: "aubergene",
  title: "Aubergene",
  partOfSlugs: ["provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  rank: "A",
} as const satisfies Restaurant
