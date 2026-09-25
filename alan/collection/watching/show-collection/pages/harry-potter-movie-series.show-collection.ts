import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const harryPotterMovieSeries = {
  id: "01a06808-6a77-7009-854b-617d54045168",
  type: "page-type/show-collection",
  slug: "harry-potter-movie-series",
  title: "Harry Potter Movie Series",
  partOfCollections: ["show-collection/harry-potter-movies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
} as const satisfies ShowCollection
