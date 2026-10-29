import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const bluey = {
  id: "01a06802-9331-700c-844b-973b801b3349",
  type: "page-type/show",
  slug: "bluey",
  title: "Bluey",
  partOfCollections: ["show-collection/family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-10-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/bluey-2018",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "82728", externalLink: "https://www.themoviedb.org/tv/82728" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Show
