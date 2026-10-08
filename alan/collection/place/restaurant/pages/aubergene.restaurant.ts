import type { Restaurant } from "akasha/alan/collection/place/restaurant/restaurant.page-type.types.ts"

export const aubergene = {
  id: "01a06808-a2ec-7001-bbba-7c14b16d57e4",
  type: "page-type/restaurant",
  slug: "aubergene",
  title: "Aubergene",
  partOfCollections: ["restaurant-collection/provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  grade: "A",
  createdAt: "2026-09-03T16:09:51.596Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Restaurant
