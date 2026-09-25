import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theExpanseSeason1 = {
  id: "01a06802-b8bf-7009-9026-9d6e5be575d9",
  type: "page-type/season",
  slug: "the-expanse-season-1",
  title: "The Expanse Season 1",
  partOfCollections: ["show/the-expanse"],
  position: 1,
  ownLength: 448.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-12-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-83179",
      externalLink: "https://trakt.tv/shows/the-expanse/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
