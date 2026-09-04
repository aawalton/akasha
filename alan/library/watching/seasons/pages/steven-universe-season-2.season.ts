import type { Season } from "../season.page-type.ts"

export const stevenUniverseSeason2 = {
  id: "01a06802-b8be-700b-8f2f-8e48fa61a4fe",
  pageTypeSlug: "season",
  slug: "steven-universe-season-2",
  title: "Steven Universe Season 2",
  partOfSlugs: ["steven-universe"],
  position: 2,
  ownLength: 348,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-03-13",
  externalId: "trakt-season-107862",
  externalLink: "https://trakt.tv/shows/steven-universe/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
