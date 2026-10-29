import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const arcaneSeason1 = {
  id: "01a06802-b8b7-700f-bd4c-77e64faeb78d",
  type: "page-type/season",
  slug: "arcane-season-1",
  title: "Arcane Season 1",
  partOfCollections: ["show/arcane"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T16:28:32.165Z",
  progressedAt: "2026-10-29T16:28:32.165Z",
} as const satisfies Season
