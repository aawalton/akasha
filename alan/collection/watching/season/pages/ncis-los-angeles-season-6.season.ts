import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSeason6 = {
  id: "01a06802-b8bb-7014-b96d-f0adaca416f4",
  type: "page-type/season",
  slug: "ncis-los-angeles-season-6",
  title: "NCIS: Los Angeles Season 6",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-91204",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Season
