import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingAtGraceland = {
  id: "01a17499-e806-796a-b09a-cf82d4bb5a95",
  type: "page-type/movie",
  slug: "wedding-at-graceland",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/at-graceland"],
  position: 2,
  publishedAt: "2019-06-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "603447",
      externalLink: "https://www.themoviedb.org/movie/603447",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding at Graceland",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9777092",
  posterPath: "/3NCFZjodGLEsvJ1vP3HQl3vDKKz.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
