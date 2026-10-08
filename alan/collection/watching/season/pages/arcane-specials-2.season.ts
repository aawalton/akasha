import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const arcaneSpecials2 = {
  id: "01a06802-b8b7-7012-8c69-4004967a73fb",
  type: "page-type/season",
  slug: "arcane-specials-2",
  title: "Arcane Specials",
  partOfCollections: ["show/arcane"],
  position: 0,
  ownLength: 121.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2024-10-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-422162",
      externalLink: "https://trakt.tv/shows/arcane/seasons/0",
      lastSyncedAt: "2025-11-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
