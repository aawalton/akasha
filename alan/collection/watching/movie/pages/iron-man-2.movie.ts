import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ironMan2 = {
  id: "01a06802-6d99-701f-9814-e6b1143443ff",
  type: "page-type/movie",
  slug: "iron-man-2",
  title: "Iron Man 2",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-05-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/iron-man-2-2010",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
