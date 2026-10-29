import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theOfficeSeason4 = {
  id: "01a06802-b8bf-7027-833b-9ebe9a424c02",
  type: "page-type/season",
  slug: "the-office-season-4",
  title: "The Office Season 4",
  partOfCollections: ["show/the-office"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7612",
      externalLink: "https://trakt.tv/shows/the-office/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Season
