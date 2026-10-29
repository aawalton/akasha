import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stevenUniverseSeason4 = {
  id: "01a06802-b8be-700d-8e59-25814f89d090",
  type: "page-type/season",
  slug: "steven-universe-season-4",
  title: "Steven Universe Season 4",
  partOfCollections: ["show/steven-universe"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-08-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-131912",
      externalLink: "https://trakt.tv/shows/steven-universe/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Season
