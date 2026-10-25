import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mixUpInTheMediterranean = {
  id: "01a1749a-259b-7218-b1da-fd00bdc138d0",
  type: "page-type/movie",
  slug: "mix-up-in-the-mediterranean",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "784389",
      externalLink: "https://www.themoviedb.org/movie/784389",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mix Up in the Mediterranean",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13737848",
  posterPath: "/670nNzefrz80DAtKDxaDF1HbQu6.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
