import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason1 = {
  id: "01a06802-b8be-7035-9cda-62751f3f60db",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-1",
  title: "The Big Bang Theory Season 1",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 1,
  ownLength: 355.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4080",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
