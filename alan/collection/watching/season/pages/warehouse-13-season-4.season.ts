import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const warehouse13Season4 = {
  id: "01a06802-b8c0-7013-b52c-dd01ebae5968",
  type: "page-type/season",
  slug: "warehouse-13-season-4",
  title: "Warehouse 13 Season 4",
  partOfCollections: ["show/warehouse-13"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-07-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "4",
      externalLink: "https://trakt.tv/shows/warehouse-13/seasons/4",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Season
