import type { Movie } from "../movie.page-type.ts"

export const antManAndTheWasp = {
  id: "01a06802-6d98-7004-bae3-4d930222318a",
  pageTypeSlug: "movie",
  slug: "ant-man-and-the-wasp",
  title: "Ant-Man and the Wasp",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2018-07-06",
  externalLink: "https://trakt.tv/movies/ant-man-and-the-wasp-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
