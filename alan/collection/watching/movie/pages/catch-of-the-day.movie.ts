import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const catchOfTheDay = {
  id: "01a1749a-a949-7b91-8eca-9b0d397de9f4",
  type: "page-type/movie",
  slug: "catch-of-the-day",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-08-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1506387",
      externalLink: "https://www.themoviedb.org/movie/1506387",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Catch of the Day",
  genres: ["Comedy", "TV Movie", "Romance"],
  imdbId: "tt37542171",
  posterPath: "/sgP1jr8RTwnRcRG60qhDOvQp9J1.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
