import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const fantasticBeastsMovieSeries = {
  id: "01a06808-6a77-7008-9b3d-aa691a9105f0",
  type: "page-type/show-collection",
  slug: "fantastic-beasts-movie-series",
  title: "Fantastic Beasts Movie Series",
  partOfCollections: ["show-collection/harry-potter-movies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
} as const satisfies ShowCollection
