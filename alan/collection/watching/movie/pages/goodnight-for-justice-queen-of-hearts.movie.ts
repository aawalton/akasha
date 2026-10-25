import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const goodnightForJusticeQueenOfHearts = {
  id: "01a17499-669e-7c9f-8374-4f8f2bc55da1",
  type: "page-type/movie",
  slug: "goodnight-for-justice-queen-of-hearts",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/goodnight-for-justice"],
  position: 3,
  publishedAt: "2013-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170776",
      externalLink: "https://www.themoviedb.org/movie/170776",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Goodnight_for_Justice:_Queen_of_Hearts",
    },
  ],
  title: "Goodnight for Justice: Queen of Hearts",
  genres: ["TV Movie", "Western"],
  imdbId: "tt2007388",
  posterPath: "/vjPQO7UfhjsIMldgOaUnoi4Ifhk.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T20:44:59.267Z",
} as const satisfies Movie
