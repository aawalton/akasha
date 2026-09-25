import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const manifestSeason2 = {
  id: "01a06802-b8ba-7033-a837-66b1a3cdcedb",
  type: "page-type/season",
  slug: "manifest-season-2",
  title: "Manifest Season 2",
  partOfCollections: ["show/manifest"],
  position: 2,
  ownLength: 557,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-01-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/manifest/seasons/2",
      lastSyncedAt: "2026-01-01",
    },
  ],
} as const satisfies Season
