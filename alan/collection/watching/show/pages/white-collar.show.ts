import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const whiteCollar = {
  id: "01a06802-9333-700f-b80e-6cbe38f0ebda",
  type: "page-type/show",
  slug: "white-collar",
  title: "White Collar",
  partOfCollections: [
    "show-collection/crime-investigation-shows",
    "show-collection/watch-with-jen",
  ],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-10-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/white-collar",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "21510", externalLink: "https://www.themoviedb.org/tv/21510" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Show
