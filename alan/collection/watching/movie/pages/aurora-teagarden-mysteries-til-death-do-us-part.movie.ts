import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesTilDeathDoUsPart = {
  id: "01a1749a-4649-7038-91e1-518eedead1f3",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-til-death-do-us-part",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 16,
  publishedAt: "2021-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "793465",
      externalLink: "https://www.themoviedb.org/movie/793465",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: Til Death Do Us Part",
  genres: ["TV Movie", "Mystery", "Crime"],
  imdbId: "tt13870774",
  posterPath: "/ujQEazbtIX9WnbXE9ZyJClabFiL.jpg",
  voteAverage: 7.375,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
