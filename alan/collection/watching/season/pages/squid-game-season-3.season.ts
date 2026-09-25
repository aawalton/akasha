import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const squidGameSeason3 = {
  id: "01a06802-b8bc-7044-b373-39710ab011ef",
  type: "page-type/season",
  slug: "squid-game-season-3",
  title: "Squid Game Season 3",
  partOfCollections: ["show/squid-game"],
  position: 3,
  ownLength: 369,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-06-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-439132",
      externalLink: "https://trakt.tv/shows/squid-game/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
