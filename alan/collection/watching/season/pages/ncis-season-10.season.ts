import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason10 = {
  id: "01a06802-b8bb-7022-a1ab-457268e117b2",
  type: "page-type/season",
  slug: "ncis-season-10",
  title: "NCIS Season 10",
  partOfCollections: ["show/ncis"],
  position: 10,
  ownLength: 1029,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14549",
      externalLink: "https://trakt.tv/shows/ncis/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
