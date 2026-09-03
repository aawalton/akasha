import type { Movie } from "../movie.page-type.ts"

export const blackWidow = {
  id: "01a06802-6d98-701a-af5a-d8dd203e317b",
  pageTypeSlug: "movie",
  slug: "black-widow",
  title: "Black Widow",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-07-09",
  externalLink: "https://trakt.tv/movies/black-widow-2021",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
