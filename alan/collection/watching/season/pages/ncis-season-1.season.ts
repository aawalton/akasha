import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason1 = {
  id: "01a06802-b8bb-7021-98a0-82965c5577e8",
  type: "page-type/season",
  slug: "ncis-season-1",
  title: "NCIS Season 1",
  partOfCollections: ["show/ncis"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14540",
      externalLink: "https://trakt.tv/shows/ncis/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
