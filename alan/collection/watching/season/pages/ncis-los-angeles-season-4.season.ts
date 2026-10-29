import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSeason4 = {
  id: "01a06802-b8bb-7012-b67f-19f62cbc689c",
  type: "page-type/season",
  slug: "ncis-los-angeles-season-4",
  title: "NCIS: Los Angeles Season 4",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-29188",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Season
