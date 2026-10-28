import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const kizumonogatariPart1Tekketsu = {
  id: "01a183db-861c-7da3-927a-e606ea15c8a4",
  type: "page-type/movie",
  slug: "kizumonogatari-part-1-tekketsu",
  ownLength: 63,
  ownProgress: 0,
  partOfCollections: ["fandom/monogatari"],
  publishedAt: "2016-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "357786",
      externalLink: "https://www.themoviedb.org/movie/357786",
    },
  ],
  title: "Kizumonogatari Part 1: Tekketsu",
  createdAt: "2026-10-28T18:52:44.444Z",
  updatedAt: "2026-10-28T18:52:44.444Z",
} as const satisfies Movie
