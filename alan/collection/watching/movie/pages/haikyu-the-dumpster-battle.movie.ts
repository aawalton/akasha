import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haikyuTheDumpsterBattle = {
  id: "01a183d2-d871-7e06-a386-811041e48357",
  type: "page-type/movie",
  slug: "haikyu-the-dumpster-battle",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["fandom/haikyu"],
  publishedAt: "2024-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012201",
      externalLink: "https://www.themoviedb.org/movie/1012201",
    },
  ],
  title: "HAIKYU!! The Dumpster Battle",
  createdAt: "2026-10-28T18:43:15.697Z",
  updatedAt: "2026-10-28T18:43:15.697Z",
} as const satisfies Movie
