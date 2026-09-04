import type { Restaurant } from "../restaurant.page-type.ts"

export const ambrosiaBakery = {
  id: "01a06808-a2ec-7000-8553-2071ebade26b",
  pageTypeSlug: "restaurant",
  slug: "ambrosia-bakery",
  title: "Ambrosia Bakery",
  partOfSlugs: ["provo-restaurants"],
  position: 0,
  ownLength: 6250,
  ownProgress: 6250,
  unitSlug: "words",
  status: "not-started",
  rank: "B",
} as const satisfies Restaurant
