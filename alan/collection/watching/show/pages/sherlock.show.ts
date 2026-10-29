import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const sherlock = {
  id: "01a06802-9332-7022-ab51-34f4a94947dc",
  type: "page-type/show",
  slug: "sherlock",
  title: "Sherlock",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-07-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/sherlock",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "19885", externalLink: "https://www.themoviedb.org/tv/19885" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Show
