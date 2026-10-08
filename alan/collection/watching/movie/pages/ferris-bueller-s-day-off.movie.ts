import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ferrisBuellerSDayOff = {
  id: "01a06802-6d99-700f-a94e-2e1edaa6a0cb",
  type: "page-type/movie",
  slug: "ferris-bueller-s-day-off",
  title: "Ferris Bueller's Day Off",
  partOfCollections: ["show-collection/cultural-literacy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1986-06-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/ferris-bueller-s-day-off-1986",
      lastSyncedAt: "2025-09-30",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
