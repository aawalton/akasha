import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const harryPotterMovies = {
  id: "01a06808-6a77-700a-8767-b6fcfa40f34a",
  type: "page-type/show-collection",
  slug: "harry-potter-movies",
  title: "Harry Potter Movies",
  partOfCollections: ["fandom/harry-potter"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "B",
  createdAt: "2026-09-03T16:09:37.143Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies ShowCollection
