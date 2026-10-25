import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theCaseForChristmas = {
  id: "01a17499-66a1-7df4-9a8c-526df10f1915",
  type: "page-type/movie",
  slug: "the-case-for-christmas",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "148888",
      externalLink: "https://www.themoviedb.org/movie/148888",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Case for Christmas",
  genres: ["TV Movie", "Fantasy", "Comedy", "Drama"],
  imdbId: "tt2039389",
  posterPath: "/c7e1bijjxAd1IEyQcUYpbcHjJah.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
