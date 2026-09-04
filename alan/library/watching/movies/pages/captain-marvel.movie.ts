import type { Movie } from "../movie.page-type.ts"

export const captainMarvel = {
  id: "01a06802-6d98-7020-bfd7-db9134cfb9af",
  pageTypeSlug: "movie",
  slug: "captain-marvel",
  title: "Captain Marvel",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2019-03-08",
  externalLink: "https://trakt.tv/movies/captain-marvel-2019",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
