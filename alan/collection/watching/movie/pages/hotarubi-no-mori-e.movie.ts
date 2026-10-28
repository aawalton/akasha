import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hotarubiNoMoriE = {
  id: "01a183da-e50f-7be8-a8ee-33631a09e9fa",
  type: "page-type/movie",
  slug: "hotarubi-no-mori-e",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["fandom/hotarubi-no-mori-e"],
  publishedAt: "2011-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "92321", externalLink: "https://www.themoviedb.org/movie/92321" },
  ],
  title: "Hotarubi no Mori e",
  createdAt: "2026-10-28T18:52:03.214Z",
  updatedAt: "2026-10-28T18:52:03.214Z",
} as const satisfies Movie
