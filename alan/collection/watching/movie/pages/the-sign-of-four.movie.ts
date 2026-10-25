import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSignOfFour = {
  id: "01a17497-195e-7a2b-b99c-ac14c53812c9",
  type: "page-type/movie",
  slug: "the-sign-of-four",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2001-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "90052",
      externalLink: "https://www.themoviedb.org/movie/90052",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Sign_of_Four_(2001_film)",
    },
  ],
  title: "The Sign of Four",
  genres: ["Mystery", "Crime", "TV Movie"],
  imdbId: "tt0270645",
  posterPath: "/vEu7vAeSr2HpT9eHFSg1wIKP1qN.jpg",
  voteAverage: 5.9,
  streamingOn: ["Tubi TV", "fuboTV"],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
