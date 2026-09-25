import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason18 = {
  id: "01a06802-b8bb-702a-bf3e-dd8732740da9",
  type: "page-type/season",
  slug: "ncis-season-18",
  title: "NCIS Season 18",
  partOfCollections: ["show/ncis"],
  position: 18,
  ownLength: 720,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-231270",
      externalLink: "https://trakt.tv/shows/ncis/seasons/18",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
