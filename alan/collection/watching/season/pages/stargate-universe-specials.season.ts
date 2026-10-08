import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateUniverseSpecials = {
  id: "01a06802-b8be-7009-9d11-db59e12c806f",
  type: "page-type/season",
  slug: "stargate-universe-specials",
  title: "Stargate Universe Specials",
  partOfCollections: ["show/stargate-universe"],
  position: 0,
  ownLength: 145.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2009-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-15503",
      externalLink: "https://trakt.tv/shows/stargate-universe/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
