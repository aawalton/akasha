import type { Movie } from "akasha/alan/library/watching/movies/movie.page-type.types.ts"

export const antManAndTheWasp = {
  id: "01a06802-6d98-7004-bae3-4d930222318a",
  type: "movie",
  slug: "ant-man-and-the-wasp",
  title: "Ant-Man and the Wasp",
  partOfCollections: ["marvel-cinematic-universe"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2018-07-06",
  externalLink: "https://trakt.tv/movies/ant-man-and-the-wasp-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
