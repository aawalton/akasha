import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const comingHomeForChristmas = {
  id: "01a17499-c95b-791f-96df-56a32a067110",
  type: "page-type/movie",
  slug: "coming-home-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474983",
      externalLink: "https://www.themoviedb.org/movie/474983",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Coming Home For Christmas",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt7038614",
  posterPath: "/zhBbQfiKVkzI622kNF2S925e5DV.jpg",
  voteAverage: 6.563,
  streamingOn: ["Hallmark+ Amazon Channel", "Hallmark+ Apple TV channel", "Philo", "fuboTV"],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
