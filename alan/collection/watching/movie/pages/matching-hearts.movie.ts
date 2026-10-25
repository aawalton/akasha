import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const matchingHearts = {
  id: "01a1749a-06bd-7b69-819f-e2cca5890c9a",
  type: "page-type/movie",
  slug: "matching-hearts",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "661332",
      externalLink: "https://www.themoviedb.org/movie/661332",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Matching Hearts",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11662610",
  posterPath: "/zvQGosiD0rF7bWaI5W39O8s3n5U.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
