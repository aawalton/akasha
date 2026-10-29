import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason2 = {
  id: "01a06802-b8be-7039-8ccb-85bb010c1efa",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-2",
  title: "The Big Bang Theory Season 2",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4081",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Season
