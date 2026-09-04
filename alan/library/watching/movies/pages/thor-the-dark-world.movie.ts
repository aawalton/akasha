import type { Movie } from "../movie.page-type.ts"

export const thorTheDarkWorld = {
  id: "01a06802-6d9a-7026-b2a3-705b52f71e00",
  pageTypeSlug: "movie",
  slug: "thor-the-dark-world",
  title: "Thor: The Dark World",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-11-08",
  externalLink: "https://trakt.tv/movies/thor-the-dark-world-2013",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
