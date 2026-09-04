import type { Season } from "../season.page-type.ts"

export const squidGameSeason3 = {
  id: "01a06802-b8bc-7044-b373-39710ab011ef",
  pageTypeSlug: "season",
  slug: "squid-game-season-3",
  title: "Squid Game Season 3",
  partOfSlugs: ["squid-game"],
  position: 3,
  ownLength: 369,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-06-27",
  externalId: "trakt-season-439132",
  externalLink: "https://trakt.tv/shows/squid-game/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
