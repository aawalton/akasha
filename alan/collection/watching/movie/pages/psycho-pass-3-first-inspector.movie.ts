import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const psychoPass3FirstInspector = {
  id: "01a183da-d34d-754e-86c4-b19b1bb961ed",
  type: "page-type/movie",
  slug: "psycho-pass-3-first-inspector",
  ownLength: 137,
  ownProgress: 0,
  partOfCollections: ["fandom/psycho-pass"],
  publishedAt: "2020-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "655431",
      externalLink: "https://www.themoviedb.org/movie/655431",
    },
  ],
  title: "Psycho-Pass 3: First Inspector",
  createdAt: "2026-10-28T18:51:58.669Z",
  updatedAt: "2026-10-28T18:51:58.669Z",
} as const satisfies Movie
