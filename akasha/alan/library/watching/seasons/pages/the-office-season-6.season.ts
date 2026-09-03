import type { Season } from "../season.page-type.ts"

export const theOfficeSeason6 = {
  id: "01a06802-b8bf-7029-85ac-de379e9d5412",
  pageTypeSlug: "season",
  slug: "the-office-season-6",
  title: "The Office Season 6",
  partOfSlugs: ["the-office"],
  position: 6,
  ownLength: 568.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-09-17",
  externalId: "trakt-season-7614",
  externalLink: "https://trakt.tv/shows/the-office/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
