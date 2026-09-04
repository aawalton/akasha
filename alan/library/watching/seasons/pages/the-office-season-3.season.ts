import type { Season } from "../season.page-type.ts"

export const theOfficeSeason3 = {
  id: "01a06802-b8bf-7026-9ac4-c39a41ad9bdc",
  pageTypeSlug: "season",
  slug: "the-office-season-3",
  title: "The Office Season 3",
  partOfSlugs: ["the-office"],
  position: 3,
  ownLength: 565.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2006-09-21",
  externalId: "trakt-season-7611",
  externalLink: "https://trakt.tv/shows/the-office/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
