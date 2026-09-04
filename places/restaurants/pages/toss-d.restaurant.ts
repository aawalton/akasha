import type { Restaurant } from "../restaurant.page-type.ts"

export const tossD = {
  id: "01a06808-a2ec-7005-8920-e1eef9c76115",
  pageTypeSlug: "restaurant",
  slug: "toss-d",
  title: "Toss’d",
  partOfSlugs: ["provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  rank: "B",
} as const satisfies Restaurant
