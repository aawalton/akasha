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
    { source: "tmdb", externalId: "122226", externalLink: "https://www.themoviedb.org/tv/122226" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:29:45.691Z",
} as const satisfies Show
