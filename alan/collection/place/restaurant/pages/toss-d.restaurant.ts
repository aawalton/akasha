import type { Restaurant } from "akasha/alan/collection/place/restaurant/restaurant.page-type.types.ts"

export const tossD = {
  id: "01a06808-a2ec-7005-8920-e1eef9c76115",
  type: "page-type/restaurant",
  slug: "toss-d",
  title: "Toss’d",
  partOfCollections: ["restaurant-collection/provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  grade: "B",
} as const satisfies Restaurant
