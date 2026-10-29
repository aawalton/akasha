import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisHawaiISeason1 = {
  id: "01a06802-b8bb-7007-b6c8-48c0100cb413",
  type: "page-type/season",
  slug: "ncis-hawai-i-season-1",
  title: "NCIS: Hawai'i Season 1",
  partOfCollections: ["show/ncis-hawai-i"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-255744",
      externalLink: "https://trakt.tv/shows/ncis-hawai-i/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:32:28.698Z",
} as const satisfies Season
