import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const northpoleOpenForChristmas = {
  id: "01a17499-8947-7ea1-ab1e-f25fddb4d48d",
  type: "page-type/movie",
  slug: "northpole-open-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/northpole"],
  position: 2,
  publishedAt: "2015-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "339543",
      externalLink: "https://www.themoviedb.org/movie/339543",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Northpole: Open for Christmas",
  genres: ["TV Movie", "Family", "Fantasy"],
  imdbId: "tt4843046",
  posterPath: "/7hbdsTv0hoV3ScEbqmqi16xRp2B.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
