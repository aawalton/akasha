import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason12 = {
  id: "01a06802-b8be-7038-9552-6cc7cfa3e967",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-12",
  title: "The Big Bang Theory Season 12",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 12,
  ownLength: 516,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-163410",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/12",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
