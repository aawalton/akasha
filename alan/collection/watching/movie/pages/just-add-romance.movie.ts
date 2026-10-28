import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const justAddRomance = {
  id: "01a17499-e803-7ab6-b6f1-45fee0c38b94",
  type: "page-type/movie",
  slug: "just-add-romance",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "583722",
      externalLink: "https://www.themoviedb.org/movie/583722",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Just Add Romance",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt9759926",
  posterPath: "/gwyriT9NvDgbG3V0BBYeV2B9Uh3.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
