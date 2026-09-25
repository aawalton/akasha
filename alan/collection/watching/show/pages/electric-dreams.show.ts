import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const electricDreams = {
  id: "01a06802-9331-7020-98bd-43d4780b387d",
  type: "page-type/show",
  slug: "electric-dreams",
  title: "Electric Dreams",
  partOfCollections: ["show-collection/speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/philip-k-dick-s-electric-dreams",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
