import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blackAdam = {
  id: "01a06802-6d98-7017-938c-bdec9e87e6c6",
  type: "page-type/movie",
  slug: "black-adam",
  title: "Black Adam",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-10-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/black-adam-2022",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
