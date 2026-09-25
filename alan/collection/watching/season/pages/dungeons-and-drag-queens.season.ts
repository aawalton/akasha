import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dungeonsAndDragQueens = {
  id: "01a06802-b8b9-7030-a07b-1aadfd44964f",
  type: "page-type/season",
  slug: "dungeons-and-drag-queens",
  title: "Dungeons and Drag Queens",
  partOfCollections: ["show/dimension-20"],
  position: 18,
  ownLength: 573,
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
} as const satisfies Season
