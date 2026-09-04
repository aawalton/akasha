import type { Season } from "../season.page-type.ts"

export const gameOfThronesSeason2 = {
  id: "01a06802-b8ba-7014-b424-3b81abcf5ae0",
  pageTypeSlug: "season",
  slug: "game-of-thrones-season-2",
  title: "Game of Thrones Season 2",
  partOfSlugs: ["game-of-thrones"],
  position: 2,
  ownLength: 549,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-04-02",
  externalId: "trakt-season-3964",
  externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
