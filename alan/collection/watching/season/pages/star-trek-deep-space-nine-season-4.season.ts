import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDeepSpaceNineSeason4 = {
  id: "01a06802-b8bc-7048-8507-399c5e814f1a",
  type: "page-type/season",
  slug: "star-trek-deep-space-nine-season-4",
  title: "Star Trek: Deep Space Nine Season 4",
  partOfCollections: ["show/star-trek-deep-space-nine"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1995-10-02",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Season
