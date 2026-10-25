import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const takeMeBackForChristmas = {
  id: "01a1749a-66c0-793e-bedb-30f5974b28e9",
  type: "page-type/movie",
  slug: "take-me-back-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1135453",
      externalLink: "https://www.themoviedb.org/movie/1135453",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Take Me Back for Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27557250",
  posterPath: "/eNZUnfDR1ThpiE9F1jOG7paby16.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
