import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theDragonPrince = {
  id: "01a06802-9332-7046-a949-e1495f6818fc",
  type: "page-type/show",
  slug: "the-dragon-prince",
  title: "The Dragon Prince",
  partOfCollections: ["show-collection/family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-dragon-prince",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "81046", externalLink: "https://www.themoviedb.org/tv/81046" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:46:02.330Z",
} as const satisfies Show
