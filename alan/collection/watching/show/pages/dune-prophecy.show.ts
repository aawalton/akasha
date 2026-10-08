import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const duneProphecy = {
  id: "01a06802-9331-701e-a037-602c614d3dba",
  type: "page-type/show",
  slug: "dune-prophecy",
  title: "Dune: Prophecy",
  partOfCollections: ["fandom/dune-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/dune-prophecy",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
