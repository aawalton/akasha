import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const eyesOfWakandaMiniseries = {
  id: "01a06802-b8b9-7043-af38-dd3fa81cc046",
  type: "page-type/season",
  slug: "eyes-of-wakanda-miniseries",
  title: "Eyes of Wakanda Miniseries",
  partOfCollections: ["show/eyes-of-wakanda"],
  position: 1,
  ownLength: 124.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-08-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-349341",
      externalLink: "https://trakt.tv/shows/eyes-of-wakanda/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
