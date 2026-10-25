import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anOldFashionedChristmas = {
  id: "01a17499-470b-798b-bee6-12e142c9c6e9",
  type: "page-type/movie",
  slug: "an-old-fashioned-christmas",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2010-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112341",
      externalLink: "https://www.themoviedb.org/movie/112341",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Old Fashioned Christmas",
  genres: ["Drama"],
  imdbId: "tt1785287",
  posterPath: "/rfV4bSKc5DpFRTajszQMT83Epmk.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
