import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const soloLevelingSoloLeveling = {
  id: "01a06802-b8bc-703f-849e-1ec6bd8f0454",
  type: "page-type/season",
  slug: "solo-leveling-solo-leveling",
  title: "Solo Leveling Solo Leveling",
  partOfCollections: ["show/solo-leveling"],
  position: 1,
  ownLength: 600,
  ownProgress: 600,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-01-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/solo-leveling/seasons/1",
      lastSyncedAt: "2025-12-24",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T14:34:29.456Z",
  completedAt: "2026-10-29",
} as const satisfies Season
