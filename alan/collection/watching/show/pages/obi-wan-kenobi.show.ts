import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const obiWanKenobi = {
  id: "01a06802-9332-7013-bb71-3cb4e588b312",
  type: "page-type/show",
  slug: "obi-wan-kenobi",
  title: "Obi-Wan Kenobi",
  partOfCollections: ["fandom/star-wars-2"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-05-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/obi-wan-kenobi",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "92830", externalLink: "https://www.themoviedb.org/tv/92830" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:34:18.520Z",
} as const satisfies Show
