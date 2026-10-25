import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTownWithoutChristmas = {
  id: "01a17497-195c-7644-8c10-552633fe937a",
  type: "page-type/movie",
  slug: "a-town-without-christmas",
  ownLength: 91,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2001-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13755",
      externalLink: "https://www.themoviedb.org/movie/13755",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Town_Without_Christmas" },
  ],
  title: "A Town Without Christmas",
  genres: ["Family", "Drama"],
  imdbId: "tt0290321",
  posterPath: "/mOfTdPm3rGaxAQlqd9qi750sKYG.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
