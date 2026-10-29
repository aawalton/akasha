import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason6 = {
  id: "01a06802-b8bb-7033-bcd3-c1188f944640",
  type: "page-type/season",
  slug: "ncis-season-6",
  title: "NCIS Season 6",
  partOfCollections: ["show/ncis"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14545",
      externalLink: "https://trakt.tv/shows/ncis/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
