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
    { source: "tmdb", externalId: "219543", externalLink: "https://www.themoviedb.org/tv/219543" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:25:52.413Z",
} as const satisfies Show
