import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason12 = {
  id: "01a06802-b8bb-7024-bbb1-4f4df2ce6312",
  type: "page-type/season",
  slug: "ncis-season-12",
  title: "NCIS Season 12",
  partOfCollections: ["show/ncis"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-91126",
      externalLink: "https://trakt.tv/shows/ncis/seasons/12",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
