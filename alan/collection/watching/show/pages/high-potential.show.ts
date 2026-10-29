import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const highPotential = {
  id: "01a06802-9331-702f-919b-f1dfcb4702d7",
  type: "page-type/show",
  slug: "high-potential",
  title: "High Potential",
  partOfCollections: [
    "show-collection/crime-investigation-shows",
    "show-collection/watch-with-jen",
  ],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  publishedAt: "2024-09-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/high-potential",
      lastSyncedAt: "2026-01-02",
    },
    { source: "tmdb", externalId: "226637", externalLink: "https://www.themoviedb.org/tv/226637" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:31:19.951Z",
} as const satisfies Show
