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
  createdAt: "2026-09-03T16:09:37.143Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies ShowCollection
