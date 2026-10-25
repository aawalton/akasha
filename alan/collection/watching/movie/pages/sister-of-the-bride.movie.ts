import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sisterOfTheBride = {
  id: "01a17499-e806-7c4e-aa21-0714f476349e",
  type: "page-type/movie",
  slug: "sister-of-the-bride",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-06-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "609063",
      externalLink: "https://www.themoviedb.org/movie/609063",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sister of the Bride",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt10337562",
  posterPath: "/80Skb80PWIO752HoyWEAwBBDQnN.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
