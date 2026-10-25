import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const feelingButterflies = {
  id: "01a1749a-464a-7280-8a13-69ac91f073ef",
  type: "page-type/movie",
  slug: "feeling-butterflies",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "927755",
      externalLink: "https://www.themoviedb.org/movie/927755",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Feeling Butterflies",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt18313970",
  posterPath: "/eSduohMZEVQHmYQKFFTkDi2ko6C.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
