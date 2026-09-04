import type { Season } from "../season.page-type.ts"

export const theOfficeSeason2 = {
  id: "01a06802-b8bf-7025-a684-e97040b8e2ab",
  pageTypeSlug: "season",
  slug: "the-office-season-2",
  title: "The Office Season 2",
  partOfSlugs: ["the-office"],
  position: 2,
  ownLength: 472.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2005-09-20",
  externalId: "trakt-season-7610",
  externalLink: "https://trakt.tv/shows/the-office/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
