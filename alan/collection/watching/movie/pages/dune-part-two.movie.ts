import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dunePartTwo = {
  id: "01a06802-6d99-7008-a782-4d9bc8eb0bea",
  type: "page-type/movie",
  slug: "dune-part-two",
  title: "Dune: Part Two",
  partOfCollections: ["fandom/dune-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-03-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/dune-part-two-2024",
      lastSyncedAt: "2025-09-30",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
