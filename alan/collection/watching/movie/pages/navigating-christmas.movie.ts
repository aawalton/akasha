import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const navigatingChristmas = {
  id: "01a1749a-66bf-7ce8-9bdb-c75fcd21ceac",
  type: "page-type/movie",
  slug: "navigating-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180814",
      externalLink: "https://www.themoviedb.org/movie/1180814",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Navigating Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt29499132",
  posterPath: "/lhymboC8cUSr2thd1P0VJjvGgHw.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
