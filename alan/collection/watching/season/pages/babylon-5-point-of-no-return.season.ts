import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const babylon5PointOfNoReturn = {
  id: "01a06802-b8b7-7015-9eaa-d442214222c3",
  type: "page-type/season",
  slug: "babylon-5-point-of-no-return",
  title: "Babylon 5 Point of No Return",
  partOfCollections: ["show/babylon-5"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1995-11-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "3",
      externalLink: "https://trakt.tv/shows/babylon-5/seasons/3",
      lastSyncedAt: "2025-12-20",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Season
