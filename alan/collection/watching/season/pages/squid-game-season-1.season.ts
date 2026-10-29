import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const squidGameSeason1 = {
  id: "01a06802-b8bc-7042-b62b-148ce07788d4",
  type: "page-type/season",
  slug: "squid-game-season-1",
  title: "Squid Game Season 1",
  partOfCollections: ["show/squid-game"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-253460",
      externalLink: "https://trakt.tv/shows/squid-game/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:40:53.560Z",
} as const satisfies Season
