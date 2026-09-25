import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const misfitsAndMagicSeason2 = {
  id: "01a06802-b8bb-7004-a4bd-c481a51ac068",
  type: "page-type/season",
  slug: "misfits-and-magic-season-2",
  title: "Misfits and Magic Season 2",
  partOfCollections: ["show/dimension-20"],
  position: 23,
  ownLength: 1405.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-410639",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/23",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
