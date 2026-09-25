import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason21 = {
  id: "01a06802-b8bb-702e-b1f6-15877b7bd3a2",
  type: "page-type/season",
  slug: "ncis-season-21",
  title: "NCIS Season 21",
  partOfCollections: ["show/ncis"],
  position: 21,
  ownLength: 435,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-02-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-340953",
      externalLink: "https://trakt.tv/shows/ncis/seasons/21",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
