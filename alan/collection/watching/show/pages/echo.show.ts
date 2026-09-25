import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const echo = {
  id: "01a06802-9331-701f-93b2-c8c22ccde51c",
  type: "page-type/show",
  slug: "echo",
  title: "Echo",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 48,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-01-10",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/echo", lastSyncedAt: "2025-10-01" },
  ],
} as const satisfies Show
