import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInWinterland = {
  id: "01a1749a-06bd-7346-826f-e21bb8d18702",
  type: "page-type/movie",
  slug: "love-in-winterland",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631430",
      externalLink: "https://www.themoviedb.org/movie/631430",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in Winterland",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt11272506",
  posterPath: "/jCyQdA1rZBUrCMj81tZy6bak9G9.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Pluto TV",
    "VIX ",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
