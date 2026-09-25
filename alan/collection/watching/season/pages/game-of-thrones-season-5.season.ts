import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gameOfThronesSeason5 = {
  id: "01a06802-b8ba-7017-a4da-8d5c168d5801",
  type: "page-type/season",
  slug: "game-of-thrones-season-5",
  title: "Game of Thrones Season 5",
  partOfCollections: ["show/game-of-thrones"],
  position: 5,
  ownLength: 564,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-04-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-3967",
      externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
