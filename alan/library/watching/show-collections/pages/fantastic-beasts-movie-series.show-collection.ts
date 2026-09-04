import type { ShowCollection } from "../show-collection.page-type.ts"

export const fantasticBeastsMovieSeries = {
  id: "01a06808-6a77-7008-9b3d-aa691a9105f0",
  pageTypeSlug: "show-collection",
  slug: "fantastic-beasts-movie-series",
  title: "Fantastic Beasts Movie Series",
  partOfSlugs: ["harry-potter-movies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
} as const satisfies ShowCollection
