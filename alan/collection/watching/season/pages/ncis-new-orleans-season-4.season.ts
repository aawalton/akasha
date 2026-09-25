import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisNewOrleansSeason4 = {
  id: "01a06802-b8bb-701c-bc79-e27917e65a67",
  type: "page-type/season",
  slug: "ncis-new-orleans-season-4",
  title: "NCIS: New Orleans Season 4",
  partOfCollections: ["show/ncis-new-orleans"],
  position: 4,
  ownLength: 1080,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-143892",
      externalLink: "https://trakt.tv/shows/ncis-new-orleans/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
