import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ncisSydney = {
  id: "01a06802-9332-7011-8ab6-fcf2d579aaa5",
  type: "page-type/show",
  slug: "ncis-sydney",
  title: "NCIS: Sydney",
  partOfCollections: ["show-collection/ncis-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-11-10",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ncis-sydney",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
