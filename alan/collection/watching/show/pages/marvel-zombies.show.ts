import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const marvelZombies = {
  id: "01a06802-9332-7009-bfe5-9d16dfa41801",
  type: "page-type/show",
  slug: "marvel-zombies",
  title: "Marvel Zombies",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 59,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-zombies",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
