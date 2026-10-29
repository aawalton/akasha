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
    { source: "tmdb", externalId: "33907", externalLink: "https://www.themoviedb.org/tv/33907" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Show
