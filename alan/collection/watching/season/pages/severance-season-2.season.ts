import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const severanceSeason2 = {
  id: "01a06802-b8bc-7034-b0d9-26ecf807562d",
  type: "page-type/season",
  slug: "severance-season-2",
  title: "Severance Season 2",
  partOfCollections: ["show/severance"],
  position: 2,
  ownLength: 538.2,
  ownProgress: 538.2,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2025-01-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/severance/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
