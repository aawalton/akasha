import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const manifestSeason3 = {
  id: "01a06802-b8ba-7034-b1b3-11982cadcec7",
  type: "page-type/season",
  slug: "manifest-season-3",
  title: "Manifest Season 3",
  partOfCollections: ["show/manifest"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-04-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "3",
      externalLink: "https://trakt.tv/shows/manifest/seasons/3",
      lastSyncedAt: "2026-01-01",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Season
