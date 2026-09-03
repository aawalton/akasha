import type { Movie } from "../movie.page-type.ts"

export const theMarvels = {
  id: "01a06802-6d9a-701b-882f-668ac37fc0ad",
  pageTypeSlug: "movie",
  slug: "the-marvels",
  title: "The Marvels",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 45,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-11-10",
  externalLink: "https://trakt.tv/movies/the-marvels-2023",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
