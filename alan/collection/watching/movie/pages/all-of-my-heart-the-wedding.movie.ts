import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allOfMyHeartTheWedding = {
  id: "01a17499-c95a-7b98-be31-b4d963911d1d",
  type: "page-type/movie",
  slug: "all-of-my-heart-the-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/all-of-my-heart"],
  position: 3,
  publishedAt: "2018-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "543342",
      externalLink: "https://www.themoviedb.org/movie/543342",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All of My Heart: The Wedding",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8589788",
  posterPath: "/1n8xrAuu8la18SXw852tzy46lNO.jpg",
  voteAverage: 7.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
