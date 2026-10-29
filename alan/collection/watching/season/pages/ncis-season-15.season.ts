import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason15 = {
  id: "01a06802-b8bb-7027-88bd-974214ae02b8",
  type: "page-type/season",
  slug: "ncis-season-15",
  title: "NCIS Season 15",
  partOfCollections: ["show/ncis"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-143917",
      externalLink: "https://trakt.tv/shows/ncis/seasons/15",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
