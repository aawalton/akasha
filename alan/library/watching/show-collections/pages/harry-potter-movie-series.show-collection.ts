import type { ShowCollection } from "../show-collection.page-type.ts"

export const harryPotterMovieSeries = {
  id: "01a06808-6a77-7009-854b-617d54045168",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "harry-potter-movie-series",
  title: "Harry Potter Movie Series",
  partOfCollections: ["harry-potter-movies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  rank: "B",
} as const satisfies ShowCollection
