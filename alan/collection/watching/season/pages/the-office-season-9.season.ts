import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theOfficeSeason9 = {
  id: "01a06802-b8bf-702c-a5b4-951cc10d7f2b",
  type: "page-type/season",
  slug: "the-office-season-9",
  title: "The Office Season 9",
  partOfCollections: ["show/the-office"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-09-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7617",
      externalLink: "https://trakt.tv/shows/the-office/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Season
