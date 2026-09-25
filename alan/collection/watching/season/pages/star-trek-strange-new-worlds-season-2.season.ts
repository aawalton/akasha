import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekStrangeNewWorldsSeason2 = {
  id: "01a06802-b8bd-7016-891c-3ff596cceda1",
  type: "page-type/season",
  slug: "star-trek-strange-new-worlds-season-2",
  title: "Star Trek: Strange New Worlds Season 2",
  partOfCollections: ["show/star-trek-strange-new-worlds"],
  position: 2,
  ownLength: 562.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-06-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-strange-new-worlds/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
