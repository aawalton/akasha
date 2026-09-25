import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const squidGame = {
  id: "01a06802-9332-7025-a175-c90f86683f15",
  type: "page-type/show",
  slug: "squid-game",
  title: "Squid Game",
  partOfCollections: ["show-collection/science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/squid-game",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
