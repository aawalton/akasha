import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ruriRocks = {
  id: "01a06802-9332-701b-8b42-fb7f4c81a3ac",
  type: "page-type/show",
  slug: "ruri-rocks",
  title: "Ruri Rocks",
  partOfCollections: ["show-collection/watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-07-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "ruri-rocks",
      externalLink: "https://trakt.tv/shows/ruri-rocks",
      lastSyncedAt: "2025-11-30",
    },
  ],
} as const satisfies Show
