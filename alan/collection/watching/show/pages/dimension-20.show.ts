import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const dimension20 = {
  id: "01a06802-9331-701a-ab01-1f10cfc9a398",
  type: "page-type/show",
  slug: "dimension-20",
  title: "Dimension 20",
  partOfCollections: ["show-collection/dungeons-and-dragons-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-19",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/all",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "89180", externalLink: "https://www.themoviedb.org/tv/89180" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Show
