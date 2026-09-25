import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSTheDefendersMiniseries = {
  id: "01a06802-b8ba-7050-a759-e10946f26d38",
  type: "page-type/season",
  slug: "marvel-s-the-defenders-miniseries",
  title: "Marvel's The Defenders Miniseries",
  partOfCollections: ["show/the-defenders"],
  position: 1,
  ownLength: 394.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-08-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-142135",
      externalLink: "https://trakt.tv/shows/marvel-s-the-defenders/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
