import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gameOfThronesSpecials = {
  id: "01a06802-b8ba-701b-bb49-a00d47030303",
  type: "page-type/season",
  slug: "game-of-thrones-specials",
  title: "Game of Thrones Specials",
  partOfCollections: ["show/game-of-thrones"],
  position: 0,
  ownLength: 3768,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2010-12-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-3962",
      externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
