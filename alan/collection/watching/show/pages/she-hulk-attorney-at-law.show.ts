import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const sheHulkAttorneyAtLaw = {
  id: "01a06802-9332-7021-a720-a02b3dbf6047",
  type: "page-type/show",
  slug: "she-hulk-attorney-at-law",
  title: "She-Hulk: Attorney at Law",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 37,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-08-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/she-hulk-attorney-at-law",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
