import type { Season } from "../season.page-type.ts"

export const theOfficeSeason5 = {
  id: "01a06802-b8bf-7028-af54-d1a48d92aa71",
  pageTypeSlug: "season",
  slug: "the-office-season-5",
  title: "The Office Season 5",
  partOfSlugs: ["the-office"],
  position: 5,
  ownLength: 613.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-09-25",
  externalId: "trakt-season-7613",
  externalLink: "https://trakt.tv/shows/the-office/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
