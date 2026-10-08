import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const inhumans = {
  id: "01a06802-9332-7002-a616-7758e81e4777",
  type: "page-type/show",
  slug: "inhumans",
  title: "Inhumans",
  partOfCollections: ["fandom/marvel-television"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-inhumans",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
