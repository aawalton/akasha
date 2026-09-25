import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ncisHawaiI = {
  id: "01a06802-9332-700d-939d-5fe0be5c197b",
  type: "page-type/show",
  slug: "ncis-hawai-i",
  title: "NCIS: Hawai'i",
  partOfCollections: ["show-collection/ncis-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ncis-hawai-i",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
