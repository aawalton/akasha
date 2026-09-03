import type { Season } from "../season.page-type.ts"

export const gameOfThronesSpecials = {
  id: "01a06802-b8ba-701b-bb49-a00d47030303",
  pageTypeSlug: "season",
  slug: "game-of-thrones-specials",
  title: "Game of Thrones Specials",
  partOfSlugs: ["game-of-thrones"],
  position: 0,
  ownLength: 3768,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2010-12-06",
  externalId: "trakt-season-3962",
  externalLink: "https://trakt.tv/shows/game-of-thrones/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
