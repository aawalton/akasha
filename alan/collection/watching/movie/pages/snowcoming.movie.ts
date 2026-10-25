import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const snowcoming = {
  id: "01a17499-e806-7790-96b9-ab22d9924fec",
  type: "page-type/movie",
  slug: "snowcoming",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "570190",
      externalLink: "https://www.themoviedb.org/movie/570190",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "SnowComing",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9323966",
  posterPath: "/u9oCLMrdu4AIsG1ewcmJqQQyzbU.jpg",
  voteAverage: 6.5,
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
