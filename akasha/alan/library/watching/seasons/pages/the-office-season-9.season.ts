import type { Season } from "../season.page-type.ts"

export const theOfficeSeason9 = {
  id: "01a06802-b8bf-702c-a5b4-951cc10d7f2b",
  pageTypeSlug: "season",
  slug: "the-office-season-9",
  title: "The Office Season 9",
  partOfSlugs: ["the-office"],
  position: 9,
  ownLength: 591,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-09-20",
  externalId: "trakt-season-7617",
  externalLink: "https://trakt.tv/shows/the-office/seasons/9",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
