import type { Movie } from "../movie.page-type.ts"

export const thorRagnarok = {
  id: "01a06802-6d9a-7025-8362-25495e35bd89",
  pageTypeSlug: "movie",
  slug: "thor-ragnarok",
  title: "Thor: Ragnarok",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2017-11-03",
  externalLink: "https://trakt.tv/movies/thor-ragnarok-2017",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
