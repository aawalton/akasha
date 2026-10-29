import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason9 = {
  id: "01a06802-b8bb-7036-aa9d-cf706b49b457",
  type: "page-type/season",
  slug: "ncis-season-9",
  title: "NCIS Season 9",
  partOfCollections: ["show/ncis"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14548",
      externalLink: "https://trakt.tv/shows/ncis/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
