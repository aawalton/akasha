import type { Season } from "../season.page-type.ts"

export const stevenUniverseSeason4 = {
  id: "01a06802-b8be-700d-8e59-25814f89d090",
  pageTypeSlug: "season",
  slug: "steven-universe-season-4",
  title: "Steven Universe Season 4",
  partOfSlugs: ["steven-universe"],
  position: 4,
  ownLength: 298.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-08-11",
  externalId: "trakt-season-131912",
  externalLink: "https://trakt.tv/shows/steven-universe/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
