import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theOfficeSeason7 = {
  id: "01a06802-b8bf-702a-84cc-e7d631a32b10",
  type: "page-type/season",
  slug: "the-office-season-7",
  title: "The Office Season 7",
  partOfCollections: ["show/the-office"],
  position: 7,
  ownLength: 588,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7615",
      externalLink: "https://trakt.tv/shows/the-office/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
