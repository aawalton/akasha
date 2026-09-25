import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const rwbyFairyTales = {
  id: "01a06802-9332-701d-a571-8e626b7b06b7",
  type: "page-type/show",
  slug: "rwby-fairy-tales",
  title: "RWBY: Fairy Tales",
  partOfCollections: ["fandom/rwby"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-10-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "rwby-fairy-tales",
      externalLink: "https://trakt.tv/shows/rwby-fairy-tales",
      lastSyncedAt: "2025-10-13",
    },
  ],
} as const satisfies Show
