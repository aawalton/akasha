import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisNewOrleansSeason2 = {
  id: "01a06802-b8bb-701a-9bef-e479402620ad",
  type: "page-type/season",
  slug: "ncis-new-orleans-season-2",
  title: "NCIS: New Orleans Season 2",
  partOfCollections: ["show/ncis-new-orleans"],
  position: 2,
  ownLength: 1080,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-112164",
      externalLink: "https://trakt.tv/shows/ncis-new-orleans/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
