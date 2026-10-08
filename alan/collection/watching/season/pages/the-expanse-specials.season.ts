import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theExpanseSpecials = {
  id: "01a06802-b8bf-700f-8f56-c40105331142",
  type: "page-type/season",
  slug: "the-expanse-specials",
  title: "The Expanse Specials",
  partOfCollections: ["show/the-expanse"],
  position: 0,
  ownLength: 2368.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2015-12-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-121210",
      externalLink: "https://trakt.tv/shows/the-expanse/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
