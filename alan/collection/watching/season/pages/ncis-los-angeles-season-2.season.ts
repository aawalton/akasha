import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSeason2 = {
  id: "01a06802-b8bb-7010-86e4-8b6a72f16787",
  type: "page-type/season",
  slug: "ncis-los-angeles-season-2",
  title: "NCIS: Los Angeles Season 2",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 2,
  ownLength: 1042.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-29186",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
