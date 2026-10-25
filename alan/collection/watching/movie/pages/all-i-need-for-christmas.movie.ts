import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allINeedForChristmas = {
  id: "01a1749a-a949-7452-8c7b-cb1033169468",
  type: "page-type/movie",
  slug: "all-i-need-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361253",
      externalLink: "https://www.themoviedb.org/movie/1361253",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All I Need for Christmas",
  genres: ["Comedy", "Romance"],
  imdbId: "tt33425676",
  posterPath: "/qH9VoUVO2rOVT3BrzP2SHOHtwrL.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
