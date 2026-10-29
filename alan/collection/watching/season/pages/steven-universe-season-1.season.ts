import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stevenUniverseSeason1 = {
  id: "01a06802-b8be-700a-bd24-24b4a7fd6c0a",
  type: "page-type/season",
  slug: "steven-universe-season-1",
  title: "Steven Universe Season 1",
  partOfCollections: ["show/steven-universe"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-11-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-61944",
      externalLink: "https://trakt.tv/shows/steven-universe/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Season
