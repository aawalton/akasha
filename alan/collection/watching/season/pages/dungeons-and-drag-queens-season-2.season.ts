import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dungeonsAndDragQueensSeason2 = {
  id: "01a06802-b8b9-7031-837a-7c3151fb0953",
  type: "page-type/season",
  slug: "dungeons-and-drag-queens-season-2",
  title: "Dungeons and Drag Queens Season 2",
  partOfCollections: ["show/dimension-20"],
  position: 24,
  ownLength: 876,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-01-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-436113",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/24",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
