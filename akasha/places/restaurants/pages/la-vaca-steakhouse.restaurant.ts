import type { Restaurant } from "../restaurant.page-type.ts"

export const laVacaSteakhouse = {
  id: "01a06808-a2ec-7003-b91a-bb824ab58acf",
  pageTypeSlug: "restaurant",
  slug: "la-vaca-steakhouse",
  title: "La Vaca Steakhouse",
  partOfSlugs: ["provo-restaurants"],
  position: 0,
  ownLength: 22500,
  ownProgress: 22500,
  unitSlug: "words",
  status: "not-started",
  rank: "A",
} as const satisfies Restaurant
