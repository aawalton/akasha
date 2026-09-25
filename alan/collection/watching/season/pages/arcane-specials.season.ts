import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const arcaneSpecials = {
  id: "01a06802-b8b7-7011-af9b-8f724c35a637",
  type: "page-type/season",
  slug: "arcane-specials",
  title: "Arcane Specials",
  partOfCollections: ["show/arcane"],
  position: 0,
  ownLength: 472,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2024-10-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/arcane/seasons/0",
      lastSyncedAt: "2026-01-03",
    },
  ],
} as const satisfies Season
