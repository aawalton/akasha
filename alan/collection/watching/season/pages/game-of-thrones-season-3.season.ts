import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gameOfThronesSeason3 = {
  id: "01a06802-b8ba-7015-b7e0-61151bf0028b",
  type: "page-type/season",
  slug: "game-of-thrones-season-3",
  title: "Game of Thrones Season 3",
  partOfCollections: ["show/game-of-thrones"],
  position: 3,
  ownLength: 561,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-04-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-3965",
      externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
