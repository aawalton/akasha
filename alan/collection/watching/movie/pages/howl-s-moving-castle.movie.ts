import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const howlSMovingCastle = {
  id: "01a183d5-721c-7862-830c-32624ee0e8b3",
  type: "page-type/movie",
  slug: "howl-s-moving-castle",
  ownLength: 119,
  ownProgress: 0,
  partOfCollections: ["fandom/howl-s-moving-castle"],
  publishedAt: "2004-09-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "4935", externalLink: "https://www.themoviedb.org/movie/4935" },
  ],
  title: "Howl's Moving Castle",
  createdAt: "2026-10-28T18:46:06.108Z",
  updatedAt: "2026-10-28T18:46:06.108Z",
} as const satisfies Movie
