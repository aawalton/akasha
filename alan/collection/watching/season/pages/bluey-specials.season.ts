import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blueySpecials = {
  id: "01a06802-b8b8-700e-86c0-43fa3118d6e0",
  type: "page-type/season",
  slug: "bluey-specials",
  title: "Bluey Specials",
  partOfCollections: ["show/bluey"],
  position: 0,
  ownLength: 214.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2019-12-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-205892",
      externalLink: "https://trakt.tv/shows/bluey-2018/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
