import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tisTheSeasonToBeMerry = {
  id: "01a1749a-464e-720a-a0bc-f55f702142c2",
  type: "page-type/movie",
  slug: "tis-the-season-to-be-merry",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "888500",
      externalLink: "https://www.themoviedb.org/movie/888500",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "’Tis the Season to be Merry",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15739902",
  posterPath: "/539aWeHrqkbaUz2Dw4m07zBARhU.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
