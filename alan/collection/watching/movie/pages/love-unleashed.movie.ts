import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveUnleashed = {
  id: "01a17499-e804-720a-97dc-820d9d21b23f",
  type: "page-type/movie",
  slug: "love-unleashed",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "612089",
      externalLink: "https://www.themoviedb.org/movie/612089",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Unleashed",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9760256",
  posterPath: "/9e6WUvcqNdvWNWXd3aamOG9miPg.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
