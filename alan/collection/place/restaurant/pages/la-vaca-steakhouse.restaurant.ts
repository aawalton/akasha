import type { Restaurant } from "akasha/alan/collection/place/restaurant/restaurant.page-type.types.ts"

export const laVacaSteakhouse = {
  id: "01a06808-a2ec-7003-b91a-bb824ab58acf",
  type: "page-type/restaurant",
  slug: "la-vaca-steakhouse",
  title: "La Vaca Steakhouse",
  partOfCollections: ["restaurant-collection/provo-restaurants"],
  position: 0,
  ownLength: 22500,
  ownProgress: 22500,
  unit: "unit/words",
  status: "not-started",
  grade: "A",
} as const satisfies Restaurant
