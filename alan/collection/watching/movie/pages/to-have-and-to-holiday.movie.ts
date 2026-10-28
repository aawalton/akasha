import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toHaveAndToHoliday = {
  id: "01a1749a-89ac-780e-b716-c3980d1eee66",
  type: "page-type/movie",
  slug: "to-have-and-to-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361162",
      externalLink: "https://www.themoviedb.org/movie/1361162",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To Have and To Holiday",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33829457",
  posterPath: "/a4Kj1mJV0Ml9TUvR8mjSSyprfdC.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
