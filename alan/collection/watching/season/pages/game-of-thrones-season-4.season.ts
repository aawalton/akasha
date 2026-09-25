import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gameOfThronesSeason4 = {
  id: "01a06802-b8ba-7016-8729-7a0586d8d5be",
  type: "page-type/season",
  slug: "game-of-thrones-season-4",
  title: "Game of Thrones Season 4",
  partOfCollections: ["show/game-of-thrones"],
  position: 4,
  ownLength: 552,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-04-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-3966",
      externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
