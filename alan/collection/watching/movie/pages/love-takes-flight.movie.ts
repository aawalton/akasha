import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveTakesFlight = {
  id: "01a17499-e804-74d2-9feb-8ee9d6983104",
  type: "page-type/movie",
  slug: "love-takes-flight",
  ownLength: 93,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "590102",
      externalLink: "https://www.themoviedb.org/movie/590102",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Takes Flight",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9876426",
  posterPath: "/tOCjOGMcmsDF2Ylsh61hP3YnG9p.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
