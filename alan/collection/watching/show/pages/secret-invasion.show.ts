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
  ],
} as const satisfies Show
