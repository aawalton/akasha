import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const manifestSeason1 = {
  id: "01a06802-b8ba-7032-8936-5e93ad088c49",
  type: "page-type/season",
  slug: "manifest-season-1",
  title: "Manifest Season 1",
  partOfCollections: ["show/manifest"],
  position: 1,
  ownLength: 679,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/manifest/seasons/1",
      lastSyncedAt: "2026-01-01",
    },
  ],
} as const satisfies Season
