import type { Season } from "../season.page-type.ts"

export const classSeason1 = {
  id: "01a06802-b8b8-702e-b64e-53601eb68733",
  pageTypeSlug: "season",
  slug: "class-season-1",
  title: "Class Season 1",
  partOfSlugs: ["show-class"],
  position: 1,
  ownLength: 363,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-10-22",
  externalId: "trakt-season-125593",
  externalLink: "https://trakt.tv/shows/class/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
