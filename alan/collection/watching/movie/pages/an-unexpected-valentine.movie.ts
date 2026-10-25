import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anUnexpectedValentine = {
  id: "01a1749a-a949-7c7a-94be-ca3066354271",
  type: "page-type/movie",
  slug: "an-unexpected-valentine",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1414160",
      externalLink: "https://www.themoviedb.org/movie/1414160",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Unexpected Valentine",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt35304903",
  posterPath: "/7REWn0JCKF8ORdepVhdlqcrzj1C.jpg",
  voteAverage: 6.727,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
