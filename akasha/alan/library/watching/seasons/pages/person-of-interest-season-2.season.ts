import type { Season } from "../season.page-type.ts"

export const personOfInterestSeason2 = {
  id: "01a06802-b8bc-7013-a6b4-6b347a4a8b03",
  pageTypeSlug: "season",
  slug: "person-of-interest-season-2",
  title: "Person of Interest Season 2",
  partOfSlugs: ["person-of-interest"],
  position: 2,
  ownLength: 967,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-09-28",
  externalId: "2",
  externalLink: "https://trakt.tv/shows/person-of-interest/seasons/2",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
