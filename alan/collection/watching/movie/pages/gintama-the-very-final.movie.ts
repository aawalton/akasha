import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gintamaTheVeryFinal = {
  id: "01a183d6-422d-715b-803e-010bff1e7820",
  type: "page-type/movie",
  slug: "gintama-the-very-final",
  ownLength: 104,
  ownProgress: 0,
  partOfCollections: ["fandom/gintama"],
  publishedAt: "2021-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "732203",
      externalLink: "https://www.themoviedb.org/movie/732203",
    },
  ],
  title: "Gintama: The Very Final",
  createdAt: "2026-10-28T18:46:59.373Z",
  updatedAt: "2026-10-28T18:46:59.373Z",
} as const satisfies Movie
