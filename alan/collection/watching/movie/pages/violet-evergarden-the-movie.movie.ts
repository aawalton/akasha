import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const violetEvergardenTheMovie = {
  id: "01a183d5-5109-74d0-ab38-3d038038171c",
  type: "page-type/movie",
  slug: "violet-evergarden-the-movie",
  ownLength: 140,
  ownProgress: 0,
  partOfCollections: ["fandom/violet-evergarden"],
  publishedAt: "2020-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "533514",
      externalLink: "https://www.themoviedb.org/movie/533514",
    },
  ],
  title: "Violet Evergarden: The Movie",
  createdAt: "2026-10-28T18:45:57.641Z",
  updatedAt: "2026-10-28T18:45:57.641Z",
} as const satisfies Movie
