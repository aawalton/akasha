import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const harryPotterAndThePhilosopherSStone = {
  id: "01a06802-6d99-701b-bdb4-6f265e1776ba",
  type: "page-type/movie",
  slug: "harry-potter-and-the-philosopher-s-stone",
  title: "Harry Potter and the Philosopher's Stone",
  partOfCollections: ["show-collection/harry-potter-movie-series"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2001-11-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/harry-potter-and-the-philosopher-s-stone-2001",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
