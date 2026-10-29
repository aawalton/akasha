import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gameOfThronesSeason2 = {
  id: "01a06802-b8ba-7014-b424-3b81abcf5ae0",
  type: "page-type/season",
  slug: "game-of-thrones-season-2",
  title: "Game of Thrones Season 2",
  partOfCollections: ["show/game-of-thrones"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-04-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-3964",
      externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Season
