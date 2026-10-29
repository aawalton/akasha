import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dungeonsAndDragQueens = {
  id: "01a06802-b8b9-7030-a07b-1aadfd44964f",
  type: "page-type/season",
  slug: "dungeons-and-drag-queens",
  title: "Dungeons and Drag Queens",
  partOfCollections: ["show/dimension-20"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-06-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-326942",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/18",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
