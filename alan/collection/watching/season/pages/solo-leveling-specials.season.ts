import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const soloLevelingSpecials = {
  id: "01a06802-b8bc-7040-9acc-701fc9eaf459",
  type: "page-type/season",
  slug: "solo-leveling-specials",
  title: "Solo Leveling Specials",
  partOfCollections: ["show/solo-leveling"],
  position: 0,
  ownLength: 24,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-02-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/solo-leveling/seasons/0",
      lastSyncedAt: "2025-12-24",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T14:36:00.000Z",
  completedAt: "2026-10-29",
} as const satisfies Season
