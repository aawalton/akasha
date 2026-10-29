import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theOfficeSeason5 = {
  id: "01a06802-b8bf-7028-af54-d1a48d92aa71",
  type: "page-type/season",
  slug: "the-office-season-5",
  title: "The Office Season 5",
  partOfCollections: ["show/the-office"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7613",
      externalLink: "https://trakt.tv/shows/the-office/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Season
