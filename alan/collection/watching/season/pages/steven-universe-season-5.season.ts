import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stevenUniverseSeason5 = {
  id: "01a06802-b8be-700e-91bd-b0db492e5e2c",
  type: "page-type/season",
  slug: "steven-universe-season-5",
  title: "Steven Universe Season 5",
  partOfCollections: ["show/steven-universe"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-05-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-143873",
      externalLink: "https://trakt.tv/shows/steven-universe/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Season
