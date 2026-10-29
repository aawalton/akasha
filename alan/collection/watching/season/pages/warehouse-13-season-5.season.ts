import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const warehouse13Season5 = {
  id: "01a06802-b8c0-7014-9fe2-c1dacd4398eb",
  type: "page-type/season",
  slug: "warehouse-13-season-5",
  title: "Warehouse 13 Season 5",
  partOfCollections: ["show/warehouse-13"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-04-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "5",
      externalLink: "https://trakt.tv/shows/warehouse-13/seasons/5",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Season
