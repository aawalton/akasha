import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSeason9 = {
  id: "01a06802-b8bb-7017-bc07-98b9e7ee5b6b",
  type: "page-type/season",
  slug: "ncis-los-angeles-season-9",
  title: "NCIS: Los Angeles Season 9",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-10-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-143889",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Season
