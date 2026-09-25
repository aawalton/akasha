import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisNewOrleansSeason7 = {
  id: "01a06802-b8bb-701f-a251-5d0b2a3757d8",
  type: "page-type/season",
  slug: "ncis-new-orleans-season-7",
  title: "NCIS: New Orleans Season 7",
  partOfCollections: ["show/ncis-new-orleans"],
  position: 7,
  ownLength: 718.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-11-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-231276",
      externalLink: "https://trakt.tv/shows/ncis-new-orleans/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
