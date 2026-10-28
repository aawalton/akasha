import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const noGameNoLifeZero = {
  id: "01a183dd-2f19-7c67-adac-13f63c353c60",
  type: "page-type/movie",
  slug: "no-game-no-life-zero",
  ownLength: 106,
  ownProgress: 0,
  partOfCollections: ["fandom/no-game-no-life"],
  publishedAt: "2017-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "445030",
      externalLink: "https://www.themoviedb.org/movie/445030",
    },
  ],
  title: "No Game No Life: Zero",
  createdAt: "2026-10-28T18:54:33.241Z",
  updatedAt: "2026-10-28T18:54:33.241Z",
} as const satisfies Movie
