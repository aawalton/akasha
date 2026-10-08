import type { Restaurant } from "akasha/alan/collection/place/restaurant/restaurant.page-type.types.ts"

export const vessel = {
  id: "01a06808-a2ed-7000-8600-f292d1571c62",
  type: "page-type/restaurant",
  slug: "vessel",
  title: "Vessel",
  partOfCollections: ["restaurant-collection/provo-restaurants"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  grade: "B",
  createdAt: "2026-09-03T16:09:51.597Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Restaurant
