import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const squidGameSeason2 = {
  id: "01a06802-b8bc-7043-a021-7678efe1fff5",
  type: "page-type/season",
  slug: "squid-game-season-2",
  title: "Squid Game Season 2",
  partOfCollections: ["show/squid-game"],
  position: 2,
  ownLength: 433.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-12-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-292934",
      externalLink: "https://trakt.tv/shows/squid-game/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
