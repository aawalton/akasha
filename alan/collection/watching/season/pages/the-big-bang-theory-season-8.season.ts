import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason8 = {
  id: "01a06802-b8bf-7000-ab77-4066559a8cbb",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-8",
  title: "The Big Bang Theory Season 8",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 8,
  ownLength: 475.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4087",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
