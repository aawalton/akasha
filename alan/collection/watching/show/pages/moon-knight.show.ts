import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const moonKnight = {
  id: "01a06802-9332-700a-a1ac-2bf0213339a9",
  type: "page-type/show",
  slug: "moon-knight",
  title: "Moon Knight",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 34,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-03-30",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/moon-knight",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
