import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const hawkeye = {
  id: "01a06802-9331-702d-b007-506640a3957c",
  type: "page-type/show",
  slug: "hawkeye",
  title: "Hawkeye",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 32,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-11-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/hawkeye-2021",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
