import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const torchwoodSpecials = {
  id: "01a06802-b8c0-7009-96c4-2f93898490c6",
  type: "page-type/season",
  slug: "torchwood-specials",
  title: "Torchwood Specials",
  partOfCollections: ["show/torchwood"],
  position: 0,
  ownLength: 34.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2006-12-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1386",
      externalLink: "https://trakt.tv/shows/torchwood/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
