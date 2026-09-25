import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSeason10 = {
  id: "01a06802-b8bb-700b-83f8-92ed8abc030c",
  type: "page-type/season",
  slug: "ncis-los-angeles-season-10",
  title: "NCIS: Los Angeles Season 10",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 10,
  ownLength: 1080,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-10-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-166306",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
