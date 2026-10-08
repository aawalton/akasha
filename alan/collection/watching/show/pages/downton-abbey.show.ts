import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const downtonAbbey = {
  id: "01a06802-9331-701d-aa44-e374b1434641",
  type: "page-type/show",
  slug: "downton-abbey",
  title: "Downton Abbey",
  partOfCollections: ["show-collection/sitcoms"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/downton-abbey",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
