import type { Movie } from "../movie.page-type.ts"

export const justiceLeague = {
  id: "01a06802-6d99-7021-94fc-6a83d02f4f50",
  pageTypeSlug: "movie",
  slug: "justice-league",
  title: "Justice League",
  partOfSlugs: ["dc-extended-universe"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-11-17",
  externalLink: "https://trakt.tv/movies/justice-league-2017",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
