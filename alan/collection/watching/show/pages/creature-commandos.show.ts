import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const creatureCommandos = {
  id: "01a06802-9331-7013-bd23-e5bcbc864db4",
  type: "page-type/show",
  slug: "creature-commandos",
  title: "Creature Commandos",
  partOfCollections: ["fandom/dc-universe"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-12-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/creature-commandos",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
