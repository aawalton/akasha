import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason8 = {
  id: "01a06802-b8bb-7035-b2eb-70cd28b02f6a",
  type: "page-type/season",
  slug: "ncis-season-8",
  title: "NCIS Season 8",
  partOfCollections: ["show/ncis"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14547",
      externalLink: "https://trakt.tv/shows/ncis/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
