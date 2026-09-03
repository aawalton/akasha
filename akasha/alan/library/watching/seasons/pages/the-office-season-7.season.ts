import type { Season } from "../season.page-type.ts"

export const theOfficeSeason7 = {
  id: "01a06802-b8bf-702a-84cc-e7d631a32b10",
  pageTypeSlug: "season",
  slug: "the-office-season-7",
  title: "The Office Season 7",
  partOfSlugs: ["the-office"],
  position: 7,
  ownLength: 588,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-09-23",
  externalId: "trakt-season-7615",
  externalLink: "https://trakt.tv/shows/the-office/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
