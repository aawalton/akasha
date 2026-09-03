import type { Season } from "../season.page-type.ts"

export const youngSheldonSeason1 = {
  id: "01a06802-b8c0-7022-9b77-64fb0449fad0",
  pageTypeSlug: "season",
  slug: "young-sheldon-season-1",
  title: "Young Sheldon Season 1",
  partOfSlugs: ["young-sheldon"],
  position: 1,
  ownLength: 442.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-09-26",
  externalId: "trakt-season-144331",
  externalLink: "https://trakt.tv/shows/young-sheldon/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
