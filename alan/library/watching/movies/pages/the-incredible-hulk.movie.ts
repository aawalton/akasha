import type { Movie } from "../movie.page-type.ts"

export const theIncredibleHulk = {
  id: "01a06802-6d9a-7014-b204-130db86e5202",
  pageTypeSlug: "movie",
  slug: "the-incredible-hulk",
  title: "The Incredible Hulk",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2008-06-12",
  externalLink: "https://trakt.tv/movies/the-incredible-hulk-2008",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
