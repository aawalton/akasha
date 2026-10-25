import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const royalIsh = {
  id: "01a1749a-a94c-774e-ba38-6035266f3566",
  type: "page-type/movie",
  slug: "royal-ish",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1418287",
      externalLink: "https://www.themoviedb.org/movie/1418287",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Royal-ish",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt35600130",
  posterPath: "/eviXuwmjoxSRzAz0sdkkvOEjNgh.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
