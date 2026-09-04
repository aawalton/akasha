import type { Season } from "../season.page-type.ts"

export const theOfficeSeason4 = {
  id: "01a06802-b8bf-7027-833b-9ebe9a424c02",
  pageTypeSlug: "season",
  slug: "the-office-season-4",
  title: "The Office Season 4",
  partOfSlugs: ["the-office"],
  position: 4,
  ownLength: 403.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-09-27",
  externalId: "trakt-season-7612",
  externalLink: "https://trakt.tv/shows/the-office/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
