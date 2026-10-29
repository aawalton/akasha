import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gameOfThronesSeason6 = {
  id: "01a06802-b8ba-7018-95cd-3bc7d693a908",
  type: "page-type/season",
  slug: "game-of-thrones-season-6",
  title: "Game of Thrones Season 6",
  partOfCollections: ["show/game-of-thrones"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-04-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-114727",
      externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Season
