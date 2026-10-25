import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aKissBeforeChristmas = {
  id: "01a1749a-2598-70da-9248-aa07e53b83c9",
  type: "page-type/movie",
  slug: "a-kiss-before-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874260",
      externalLink: "https://www.themoviedb.org/movie/874260",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Kiss Before Christmas",
  genres: ["TV Movie", "Romance", "Comedy", "Drama"],
  imdbId: "tt15565510",
  posterPath: "/ma8NZSDDx7e7BnYS9Rca3oDknOd.jpg",
  voteAverage: 6.014,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
