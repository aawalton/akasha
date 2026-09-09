import type { ShowCollection } from "../show-collection.page-type.ts"

export const awardWinningMovies = {
  id: "01a06808-6a77-7001-9952-6ee2f1f82888",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "award-winning-movies",
  title: "Award-winning Movies",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
