import type { Restaurant } from "../restaurant.page-type.ts"

export const cafeZupas = {
  id: "01a06808-a2ec-7002-97e7-c0dfba26da8a",
  pageTypeSlug: "restaurant",
  slug: "cafe-zupas",
  title: "Cafe Zupas",
  partOfSlugs: ["provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  rank: "A",
} as const satisfies Restaurant
