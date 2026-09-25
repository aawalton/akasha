import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theOfficeSeason1 = {
  id: "01a06802-b8bf-7024-99f2-2ef583b8f100",
  type: "page-type/season",
  slug: "the-office-season-1",
  title: "The Office Season 1",
  partOfCollections: ["show/the-office"],
  position: 1,
  ownLength: 133.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2005-03-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7609",
      externalLink: "https://trakt.tv/shows/the-office/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
