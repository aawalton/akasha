import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const warehouse13Season3 = {
  id: "01a06802-b8c0-7012-83bd-d0bb01e8c9fa",
  type: "page-type/season",
  slug: "warehouse-13-season-3",
  title: "Warehouse 13 Season 3",
  partOfCollections: ["show/warehouse-13"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-07-12",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "3",
      externalLink: "https://trakt.tv/shows/warehouse-13/seasons/3",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Season
