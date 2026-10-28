import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const yourName = {
  id: "01a183d5-56fc-7a74-9650-7456a3e3ea90",
  type: "page-type/movie",
  slug: "your-name",
  ownLength: 106,
  ownProgress: 0,
  partOfCollections: ["fandom/your-name"],
  publishedAt: "2016-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "372058",
      externalLink: "https://www.themoviedb.org/movie/372058",
    },
  ],
  title: "Your Name.",
  createdAt: "2026-10-28T18:45:59.164Z",
  updatedAt: "2026-10-28T18:45:59.164Z",
} as const satisfies Movie
