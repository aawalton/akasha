import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const psychoPassTheMovie = {
  id: "01a183da-ac11-743f-aa6c-0b65b7271b18",
  type: "page-type/movie",
  slug: "psycho-pass-the-movie",
  ownLength: 113,
  ownProgress: 0,
  partOfCollections: ["fandom/psycho-pass"],
  publishedAt: "2015-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "296917",
      externalLink: "https://www.themoviedb.org/movie/296917",
    },
  ],
  title: "PSYCHO-PASS: The Movie",
  createdAt: "2026-10-28T18:51:48.624Z",
  updatedAt: "2026-10-28T18:51:48.624Z",
} as const satisfies Movie
