import type { Season } from "../season.page-type.ts"

export const frankHerbertSDuneMiniseries = {
  id: "01a06802-b8ba-7002-beee-ac3103046081",
  pageTypeSlug: "season",
  slug: "frank-herbert-s-dune-miniseries",
  title: "Frank Herbert's Dune Miniseries",
  partOfSlugs: ["frank-herbert-s-dune"],
  position: 1,
  ownLength: 285,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2000-12-03",
  externalId: "trakt-season-30606",
  externalLink: "https://trakt.tv/shows/frank-herbert-s-dune/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
