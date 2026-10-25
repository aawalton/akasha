import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSComplicated = {
  id: "01a17499-a7d6-724f-9f88-d847e9003405",
  type: "page-type/movie",
  slug: "love-s-complicated",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "374606",
      externalLink: "https://www.themoviedb.org/movie/374606",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love's Complicated",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt5212042",
  posterPath: "/uGhZzxS8RFh8B3sCSjrzuMZi9Y9.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Tubi TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
