import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const secretInvasion = {
  id: "01a06802-9332-701f-bb5d-f71d5f032575",
  type: "page-type/show",
  slug: "secret-invasion",
  title: "Secret Invasion",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 42,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-06-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/secret-invasion",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "114472", externalLink: "https://www.themoviedb.org/tv/114472" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:30:14.782Z",
} as const satisfies Show
