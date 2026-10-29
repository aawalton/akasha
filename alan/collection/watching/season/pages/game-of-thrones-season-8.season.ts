import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gameOfThronesSeason8 = {
  id: "01a06802-b8ba-701a-bacb-c6d8c2eb0361",
  type: "page-type/season",
  slug: "game-of-thrones-season-8",
  title: "Game of Thrones Season 8",
  partOfCollections: ["show/game-of-thrones"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-04-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-184210",
      externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Season
