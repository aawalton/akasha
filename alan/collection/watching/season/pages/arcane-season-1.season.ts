import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const arcaneSeason1 = {
  id: "01a06802-b8b7-700f-bd4c-77e64faeb78d",
  type: "page-type/season",
  slug: "arcane-season-1",
  title: "Arcane Season 1",
  partOfCollections: ["show/arcane"],
  position: 1,
  ownLength: 379.2,
  ownProgress: 379.2,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2021-11-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/arcane/seasons/1",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Season
