import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const stargateUniverse = {
  id: "01a06802-9332-703b-90e7-65faf4fa9eed",
  type: "page-type/show",
  slug: "stargate-universe",
  title: "Stargate Universe",
  partOfCollections: ["fandom/stargate-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-10-02",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/stargate-universe",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
