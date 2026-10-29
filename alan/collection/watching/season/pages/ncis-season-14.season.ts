import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason14 = {
  id: "01a06802-b8bb-7026-b10d-7dc65db5e151",
  type: "page-type/season",
  slug: "ncis-season-14",
  title: "NCIS Season 14",
  partOfCollections: ["show/ncis"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-128586",
      externalLink: "https://trakt.tv/shows/ncis/seasons/14",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
