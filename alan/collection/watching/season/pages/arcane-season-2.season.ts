import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const arcaneSeason2 = {
  id: "01a06802-b8b7-7010-8f3e-4870890f4f87",
  type: "page-type/season",
  slug: "arcane-season-2",
  title: "Arcane Season 2",
  partOfCollections: ["show/arcane"],
  position: 2,
  ownLength: 379.2,
  ownProgress: 379.2,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2024-11-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/arcane/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
