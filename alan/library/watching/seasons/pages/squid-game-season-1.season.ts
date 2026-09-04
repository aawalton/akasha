import type { Season } from "../season.page-type.ts"

export const squidGameSeason1 = {
  id: "01a06802-b8bc-7042-b62b-148ce07788d4",
  pageTypeSlug: "season",
  slug: "squid-game-season-1",
  title: "Squid Game Season 1",
  partOfSlugs: ["squid-game"],
  position: 1,
  ownLength: 495,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-09-17",
  externalId: "trakt-season-253460",
  externalLink: "https://trakt.tv/shows/squid-game/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
