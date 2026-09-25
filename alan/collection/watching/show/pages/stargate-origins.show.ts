import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const stargateOrigins = {
  id: "01a06802-9332-7039-aad6-2c38660c15e6",
  type: "page-type/show",
  slug: "stargate-origins",
  title: "Stargate Origins",
  partOfCollections: ["fandom/stargate-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-02-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/stargate-origins",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
