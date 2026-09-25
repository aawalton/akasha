import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const wandavision = {
  id: "01a06802-9333-700c-9f9d-4e3ed12c2e92",
  type: "page-type/show",
  slug: "wandavision",
  title: "WandaVision",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 28,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-01-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/wandavision",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
