import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingCottage = {
  id: "01a1749a-66c1-7bd9-9ac5-50f792d50625",
  type: "page-type/movie",
  slug: "the-wedding-cottage",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1093764",
      externalLink: "https://www.themoviedb.org/movie/1093764",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Cottage",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27010338",
  posterPath: "/tCL19os5OXvEYU4GpMYUpgVMHeV.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
