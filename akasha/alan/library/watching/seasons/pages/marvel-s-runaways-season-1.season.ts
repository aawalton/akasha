import type { Season } from "../season.page-type.ts"

export const marvelSRunawaysSeason1 = {
  id: "01a06802-b8ba-704d-9623-94e81f77e766",
  pageTypeSlug: "season",
  slug: "marvel-s-runaways-season-1",
  title: "Marvel's Runaways Season 1",
  partOfSlugs: ["runaways"],
  position: 1,
  ownLength: 502.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-11-21",
  externalId: "trakt-season-147687",
  externalLink: "https://trakt.tv/shows/marvel-s-runaways/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
