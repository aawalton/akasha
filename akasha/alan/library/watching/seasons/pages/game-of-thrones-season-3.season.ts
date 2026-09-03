import type { Season } from "../season.page-type.ts"

export const gameOfThronesSeason3 = {
  id: "01a06802-b8ba-7015-b7e0-61151bf0028b",
  pageTypeSlug: "season",
  slug: "game-of-thrones-season-3",
  title: "Game of Thrones Season 3",
  partOfSlugs: ["game-of-thrones"],
  position: 3,
  ownLength: 561,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-04-01",
  externalId: "trakt-season-3965",
  externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
