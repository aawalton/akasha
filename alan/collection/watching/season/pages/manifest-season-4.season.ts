import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const manifestSeason4 = {
  id: "01a06802-b8ba-7035-933d-688128e130ef",
  type: "page-type/season",
  slug: "manifest-season-4",
  title: "Manifest Season 4",
  partOfCollections: ["show/manifest"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-11-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "4",
      externalLink: "https://trakt.tv/shows/manifest/seasons/4",
      lastSyncedAt: "2026-01-01",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Season
