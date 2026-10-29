import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const castle = {
  id: "01a06802-9331-700f-9ea8-79acf4cfa58c",
  type: "page-type/show",
  slug: "castle",
  title: "Castle",
  partOfCollections: [
    "show-collection/crime-investigation-shows",
    "show-collection/watch-with-jen",
  ],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-03-09",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/castle", lastSyncedAt: "2025-10-01" },
    { source: "tmdb", externalId: "1419", externalLink: "https://www.themoviedb.org/tv/1419" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Show
