import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const parksAndRecreation = {
  id: "01a06802-9332-7014-a430-a9dc9a13d739",
  type: "page-type/show",
  slug: "parks-and-recreation",
  title: "Parks and Recreation",
  partOfCollections: ["show-collection/sitcoms"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-04-10",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/parks-and-recreation",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
