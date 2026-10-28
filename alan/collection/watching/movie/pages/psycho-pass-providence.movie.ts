import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const psychoPassProvidence = {
  id: "01a183da-dbb1-7dad-9dc8-bc2208714e65",
  type: "page-type/movie",
  slug: "psycho-pass-providence",
  ownLength: 121,
  ownProgress: 0,
  partOfCollections: ["fandom/psycho-pass"],
  publishedAt: "2023-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012652",
      externalLink: "https://www.themoviedb.org/movie/1012652",
    },
  ],
  title: "Psycho-Pass: Providence",
  createdAt: "2026-10-28T18:52:00.817Z",
  updatedAt: "2026-10-28T18:52:00.817Z",
} as const satisfies Movie
