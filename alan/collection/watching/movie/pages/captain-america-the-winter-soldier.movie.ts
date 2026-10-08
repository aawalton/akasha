import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const captainAmericaTheWinterSoldier = {
  id: "01a06802-6d98-701f-af8d-f78433374dd4",
  type: "page-type/movie",
  slug: "captain-america-the-winter-soldier",
  title: "Captain America: The Winter Soldier",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-04-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/captain-america-the-winter-soldier-2014",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
