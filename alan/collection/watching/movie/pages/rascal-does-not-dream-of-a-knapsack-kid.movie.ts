import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rascalDoesNotDreamOfAKnapsackKid = {
  id: "01a183d5-b201-7def-b035-bfd05fb534ba",
  type: "page-type/movie",
  slug: "rascal-does-not-dream-of-a-knapsack-kid",
  ownLength: 75,
  ownProgress: 0,
  partOfCollections: ["fandom/rascal-does-not-dream"],
  publishedAt: "2023-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1086591",
      externalLink: "https://www.themoviedb.org/movie/1086591",
    },
  ],
  title: "Rascal Does Not Dream of a Knapsack Kid",
  createdAt: "2026-10-28T18:46:22.465Z",
  updatedAt: "2026-10-28T18:46:22.465Z",
} as const satisfies Movie
