import type { Restaurant } from "akasha/alan/collection/place/restaurant/restaurant.page-type.types.ts"

export const cafeZupas = {
  id: "01a06808-a2ec-7002-97e7-c0dfba26da8a",
  type: "page-type/restaurant",
  slug: "cafe-zupas",
  title: "Cafe Zupas",
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
