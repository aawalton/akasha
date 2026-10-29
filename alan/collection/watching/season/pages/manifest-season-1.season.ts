import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const manifestSeason1 = {
  id: "01a06802-b8ba-7032-8936-5e93ad088c49",
  type: "page-type/season",
  slug: "manifest-season-1",
  title: "Manifest Season 1",
  partOfCollections: ["show/manifest"],
  position: 1,
  ownLength: 0,
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
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Season
