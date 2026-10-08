import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const avengersAgeOfUltron = {
  id: "01a06802-6d98-7009-9fbb-5ebb47e73625",
  type: "page-type/movie",
  slug: "avengers-age-of-ultron",
  title: "Avengers: Age of Ultron",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-05-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/avengers-age-of-ultron-2015",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
