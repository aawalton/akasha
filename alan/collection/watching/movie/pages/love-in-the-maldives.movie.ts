import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInTheMaldives = {
  id: "01a1749a-66be-7109-95e6-be3abf280811",
  type: "page-type/movie",
  slug: "love-in-the-maldives",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1091799",
      externalLink: "https://www.themoviedb.org/movie/1091799",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in the Maldives",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt26938504",
  posterPath: "/8PprbqYxejASjE2g3ZohEc0l9bG.jpg",
  voteAverage: 6.6,
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
