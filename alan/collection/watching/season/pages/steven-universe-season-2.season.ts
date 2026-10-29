import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stevenUniverseSeason2 = {
  id: "01a06802-b8be-700b-8f2f-8e48fa61a4fe",
  type: "page-type/season",
  slug: "steven-universe-season-2",
  title: "Steven Universe Season 2",
  partOfCollections: ["show/steven-universe"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-03-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-107862",
      externalLink: "https://trakt.tv/shows/steven-universe/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Season
