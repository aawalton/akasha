import type { Movie } from "../movie.page-type.ts"

export const thor = {
  id: "01a06802-6d9a-7023-812d-245cb9f6bbb5",
  pageTypeSlug: "movie",
  slug: "thor",
  title: "Thor",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2011-05-06",
  externalLink: "https://trakt.tv/movies/thor-2011",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
