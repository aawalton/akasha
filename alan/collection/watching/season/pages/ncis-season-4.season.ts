import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason4 = {
  id: "01a06802-b8bb-7031-b805-b67a14a3a955",
  type: "page-type/season",
  slug: "ncis-season-4",
  title: "NCIS Season 4",
  partOfCollections: ["show/ncis"],
  position: 4,
  ownLength: 1051.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-09-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14543",
      externalLink: "https://trakt.tv/shows/ncis/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
