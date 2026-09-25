import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theExpanseSeason5 = {
  id: "01a06802-b8bf-700d-bf0f-dde8581f050c",
  type: "page-type/season",
  slug: "the-expanse-season-5",
  title: "The Expanse Season 5",
  partOfCollections: ["show/the-expanse"],
  position: 5,
  ownLength: 525,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-12-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-230724",
      externalLink: "https://trakt.tv/shows/the-expanse/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
