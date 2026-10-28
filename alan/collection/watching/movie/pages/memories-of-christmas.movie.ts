import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const memoriesOfChristmas = {
  id: "01a17499-e804-71ec-abf4-0ffc2abced0c",
  type: "page-type/movie",
  slug: "memories-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "549326",
      externalLink: "https://www.themoviedb.org/movie/549326",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Memories of Christmas",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt8990334",
  posterPath: "/2pn1mKv7sFF5f7fZSGXy1nbLFcn.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
