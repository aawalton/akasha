import type { Season } from "../season.page-type.ts"

export const gameOfThronesSeason8 = {
  id: "01a06802-b8ba-701a-bacb-c6d8c2eb0361",
  pageTypeSlug: "season",
  slug: "game-of-thrones-season-8",
  title: "Game of Thrones Season 8",
  partOfSlugs: ["game-of-thrones"],
  position: 8,
  ownLength: 435,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-04-15",
  externalId: "trakt-season-184210",
  externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/8",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
