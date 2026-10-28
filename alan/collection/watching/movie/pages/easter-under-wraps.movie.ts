import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const easterUnderWraps = {
  id: "01a17499-e802-72e4-b47a-c63b2ce30593",
  type: "page-type/movie",
  slug: "easter-under-wraps",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "586655",
      externalLink: "https://www.themoviedb.org/movie/586655",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Easter Under Wraps",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9876418",
  posterPath: "/A4nYhxwnH2aOLpvI8swok1fiQtQ.jpg",
  voteAverage: 6.44,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
