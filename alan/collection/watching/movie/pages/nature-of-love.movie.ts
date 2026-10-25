import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const natureOfLove = {
  id: "01a1749a-06be-7bb1-b477-1cc57de7bb21",
  type: "page-type/movie",
  slug: "nature-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "677211",
      externalLink: "https://www.themoviedb.org/movie/677211",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Nature of Love",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt8531658",
  posterPath: "/nDs9boSQ07zSKMeR6IFAXmUQh63.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
