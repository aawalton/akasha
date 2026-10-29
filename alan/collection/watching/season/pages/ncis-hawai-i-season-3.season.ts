import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisHawaiISeason3 = {
  id: "01a06802-b8bb-7009-bd7e-a74e2e5b3aa0",
  type: "page-type/season",
  slug: "ncis-hawai-i-season-3",
  title: "NCIS: Hawai'i Season 3",
  partOfCollections: ["show/ncis-hawai-i"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-02-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-340946",
      externalLink: "https://trakt.tv/shows/ncis-hawai-i/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:32:28.698Z",
} as const satisfies Season
