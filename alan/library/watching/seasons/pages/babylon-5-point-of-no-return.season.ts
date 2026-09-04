import type { Season } from "../season.page-type.ts"

export const babylon5PointOfNoReturn = {
  id: "01a06802-b8b7-7015-9eaa-d442214222c3",
  pageTypeSlug: "season",
  slug: "babylon-5-point-of-no-return",
  title: "Babylon 5 Point of No Return",
  partOfSlugs: ["babylon-5"],
  position: 3,
  ownLength: 990,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1995-11-07",
  externalId: "3",
  externalLink: "https://trakt.tv/shows/babylon-5/seasons/3",
  lastSyncedAt: "2025-12-20",
} as const satisfies Season
