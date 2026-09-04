import type { Season } from "../season.page-type.ts"

export const stargateUniverseSpecials = {
  id: "01a06802-b8be-7009-9d11-db59e12c806f",
  pageTypeSlug: "season",
  slug: "stargate-universe-specials",
  title: "Stargate Universe Specials",
  partOfSlugs: ["stargate-universe"],
  position: 0,
  ownLength: 145.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2009-10-03",
  externalId: "trakt-season-15503",
  externalLink: "https://trakt.tv/shows/stargate-universe/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
