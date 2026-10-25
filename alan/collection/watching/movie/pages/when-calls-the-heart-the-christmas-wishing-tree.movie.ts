import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whenCallsTheHeartTheChristmasWishingTree = {
  id: "01a17499-c960-76e3-8b02-21e466549ede",
  type: "page-type/movie",
  slug: "when-calls-the-heart-the-christmas-wishing-tree",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/when-calls-the-heart"],
  position: 5,
  publishedAt: "2017-12-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383656",
      externalLink: "https://www.themoviedb.org/movie/1383656",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "When Calls The Heart: The Christmas Wishing Tree",
  genres: ["Drama", "History", "Romance"],
  imdbId: "tt7787044",
  posterPath: "/RMtTuG5jnWYmgxmu0yY9oNslb7.jpg",
  voteAverage: 6,
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
