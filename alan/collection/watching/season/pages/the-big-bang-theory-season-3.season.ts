import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason3 = {
  id: "01a06802-b8be-703a-aa76-dfb7c3b6b250",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-3",
  title: "The Big Bang Theory Season 3",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 3,
  ownLength: 468,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4082",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
