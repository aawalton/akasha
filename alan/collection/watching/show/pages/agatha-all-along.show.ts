import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const agathaAllAlong = {
  id: "01a06802-9331-7001-97c2-d5d329a17076",
  type: "page-type/show",
  slug: "agatha-all-along",
  title: "Agatha All Along",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 51,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-09-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/agatha-all-along",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
