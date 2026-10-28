import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const findingSanta = {
  id: "01a17499-c95c-798f-915f-747034be5bc4",
  type: "page-type/movie",
  slug: "finding-santa",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474985",
      externalLink: "https://www.themoviedb.org/movie/474985",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Finding Santa",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt7385392",
  posterPath: "/c6t3RJK3jJi6S6tvuYyZcuMamsT.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
