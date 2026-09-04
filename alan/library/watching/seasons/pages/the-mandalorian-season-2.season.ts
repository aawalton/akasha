import type { Season } from "../season.page-type.ts"

export const theMandalorianSeason2 = {
  id: "01a06802-b8bf-7019-acfb-466e36f488c3",
  pageTypeSlug: "season",
  slug: "the-mandalorian-season-2",
  title: "The Mandalorian Season 2",
  partOfSlugs: ["the-mandalorian"],
  position: 2,
  ownLength: 348,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-10-30",
  externalId: "trakt-season-207186",
  externalLink: "https://trakt.tv/shows/the-mandalorian/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
