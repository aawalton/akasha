import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const strangerThings = {
  id: "01a06802-9332-703d-9427-f3f98f74053c",
  type: "page-type/show",
  slug: "stranger-things",
  title: "Stranger Things",
  partOfCollections: ["show-collection/award-winning-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-07-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/stranger-things",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
