import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const secondChances = {
  id: "01a17499-66a1-7039-8952-ece2316b5f0d",
  type: "page-type/movie",
  slug: "second-chances",
  ownLength: 10,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-07-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "272103",
      externalLink: "https://www.themoviedb.org/movie/272103",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Second Chances",
  genres: ["Drama", "Fantasy"],
  imdbId: "tt2705368",
  voteAverage: 0,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
