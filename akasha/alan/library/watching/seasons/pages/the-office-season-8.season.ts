import type { Season } from "../season.page-type.ts"

export const theOfficeSeason8 = {
  id: "01a06802-b8bf-702b-87ae-4bf776131cf2",
  pageTypeSlug: "season",
  slug: "the-office-season-8",
  title: "The Office Season 8",
  partOfSlugs: ["the-office"],
  position: 8,
  ownLength: 528,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-09-22",
  externalId: "trakt-season-7616",
  externalLink: "https://trakt.tv/shows/the-office/seasons/8",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
