import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasOnCall = {
  id: "01a1749a-89a7-7cf4-aae6-1c88f78ae240",
  type: "page-type/movie",
  slug: "christmas-on-call",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361154",
      externalLink: "https://www.themoviedb.org/movie/1361154",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas On Call",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt33829451",
  posterPath: "/rCevH4qPZasa6MHTjyYpY9EqqOS.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
