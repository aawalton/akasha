import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason2 = {
  id: "01a06802-b8bb-702c-bbf7-5f80474e27af",
  type: "page-type/season",
  slug: "ncis-season-2",
  title: "NCIS Season 2",
  partOfCollections: ["show/ncis"],
  position: 2,
  ownLength: 1008,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2004-09-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14541",
      externalLink: "https://trakt.tv/shows/ncis/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
