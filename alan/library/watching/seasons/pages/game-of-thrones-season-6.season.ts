import type { Season } from "../season.page-type.ts"

export const gameOfThronesSeason6 = {
  id: "01a06802-b8ba-7018-95cd-3bc7d693a908",
  pageTypeSlug: "season",
  slug: "game-of-thrones-season-6",
  title: "Game of Thrones Season 6",
  partOfSlugs: ["game-of-thrones"],
  position: 6,
  ownLength: 564,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-04-25",
  externalId: "trakt-season-114727",
  externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
