import type { Movie } from "../movie.page-type.ts"

export const avengersAgeOfUltron = {
  id: "01a06802-6d98-7009-9fbb-5ebb47e73625",
  pageTypeSlug: "movie",
  slug: "avengers-age-of-ultron",
  title: "Avengers: Age of Ultron",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2015-05-01",
  externalLink: "https://trakt.tv/movies/avengers-age-of-ultron-2015",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
