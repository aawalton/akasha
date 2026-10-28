import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const kizumonogatariPart3Reiketsu = {
  id: "01a183db-9aae-79c5-922d-665b2021193a",
  type: "page-type/movie",
  slug: "kizumonogatari-part-3-reiketsu",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["fandom/monogatari"],
  publishedAt: "2017-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "362585",
      externalLink: "https://www.themoviedb.org/movie/362585",
    },
  ],
  title: "Kizumonogatari Part 3: Reiketsu",
  createdAt: "2026-10-28T18:52:49.709Z",
  updatedAt: "2026-10-28T18:52:49.709Z",
} as const satisfies Movie
