import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const awardWinningMovies = {
  id: "01a06808-6a77-7001-9952-6ee2f1f82888",
  type: "page-type/show-collection",
  slug: "award-winning-movies",
  title: "Award-winning Movies",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
