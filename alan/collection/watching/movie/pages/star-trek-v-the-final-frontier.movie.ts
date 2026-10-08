import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekVTheFinalFrontier = {
  id: "01a06802-6d99-7045-ac77-f3c08b3f340a",
  type: "page-type/movie",
  slug: "star-trek-v-the-final-frontier",
  title: "Star Trek V: The Final Frontier",
  partOfCollections: ["fandom/star-trek-3"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1989-06-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-v-the-final-frontier-1989",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
