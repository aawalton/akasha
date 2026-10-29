import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDeepSpaceNineSeason6 = {
  id: "01a06802-b8bc-704a-a354-f9aa52b858c8",
  type: "page-type/season",
  slug: "star-trek-deep-space-nine-season-6",
  title: "Star Trek: Deep Space Nine Season 6",
  partOfCollections: ["show/star-trek-deep-space-nine"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1997-09-29",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Season
