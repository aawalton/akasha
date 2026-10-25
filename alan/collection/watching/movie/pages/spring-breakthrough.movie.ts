import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const springBreakthrough = {
  id: "01a1749a-89aa-738c-b791-e3ded1fede60",
  type: "page-type/movie",
  slug: "spring-breakthrough",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1093773",
      externalLink: "https://www.themoviedb.org/movie/1093773",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Spring Breakthrough",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt27244847",
  posterPath: "/zb3ogdSraC9HhH9Yq3mO1DK47td.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
