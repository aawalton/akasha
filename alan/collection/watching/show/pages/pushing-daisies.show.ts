import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const pushingDaisies = {
  id: "01a06802-9332-7018-a2e6-fc08269c1842",
  type: "page-type/show",
  slug: "pushing-daisies",
  title: "Pushing Daisies",
  partOfCollections: [
    "show-collection/crime-investigation-shows",
    "show-collection/watch-with-jen",
  ],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-10-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/pushing-daisies",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "5639", externalLink: "https://www.themoviedb.org/tv/5639" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:29:56.379Z",
} as const satisfies Show
