import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const kizumonogatariPart2Nekketsu = {
  id: "01a183db-8dd3-79f8-b154-45c8d2585204",
  type: "page-type/movie",
  slug: "kizumonogatari-part-2-nekketsu",
  ownLength: 68,
  ownProgress: 0,
  partOfCollections: ["fandom/monogatari"],
  publishedAt: "2016-08-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "362584",
      externalLink: "https://www.themoviedb.org/movie/362584",
    },
  ],
  title: "Kizumonogatari Part 2: Nekketsu",
  createdAt: "2026-10-28T18:52:46.419Z",
  updatedAt: "2026-10-28T18:52:46.419Z",
} as const satisfies Movie
