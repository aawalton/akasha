import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theJourneyAhead = {
  id: "01a1749a-66c1-7d56-ba0a-8ee6db2b754e",
  type: "page-type/movie",
  slug: "the-journey-ahead",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1002373",
      externalLink: "https://www.themoviedb.org/movie/1002373",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Journey Ahead",
  genres: ["TV Movie", "Adventure", "Romance"],
  imdbId: "tt4681574",
  posterPath: "/iv3K4tY70phKeagLEqIjjuLiYCs.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
