import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theHolidaySitter = {
  id: "01a1749a-66c1-7aa8-acc6-6a5d0f897845",
  type: "page-type/movie",
  slug: "the-holiday-sitter",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027324",
      externalLink: "https://www.themoviedb.org/movie/1027324",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Holiday_Sitter" },
  ],
  title: "The Holiday Sitter",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt22296044",
  posterPath: "/fTKNvBCoGLTfNBRl2hD0PHjhVEv.jpg",
  voteAverage: 6.663,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
