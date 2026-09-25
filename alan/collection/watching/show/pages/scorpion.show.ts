import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const scorpion = {
  id: "01a06802-9332-701e-9723-78bc22667366",
  type: "page-type/show",
  slug: "scorpion",
  title: "Scorpion",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/scorpion",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
