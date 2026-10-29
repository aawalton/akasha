import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const numb3rs = {
  id: "01a06802-9332-7012-aa15-d78084de1843",
  type: "page-type/show",
  slug: "numb3rs",
  title: "Numb3rs",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-01-24",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/numb3rs", lastSyncedAt: "2025-10-01" },
    { source: "tmdb", externalId: "578", externalLink: "https://www.themoviedb.org/tv/578" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Show
