import type { Season } from "../season.page-type.ts"

export const gameOfThronesSeason1 = {
  id: "01a06802-b8ba-7013-87e9-b2c998ca7d30",
  pageTypeSlug: "season",
  slug: "game-of-thrones-season-1",
  title: "Game of Thrones Season 1",
  partOfSlugs: ["game-of-thrones"],
  position: 1,
  ownLength: 567,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-04-18",
  externalId: "trakt-season-3963",
  externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
