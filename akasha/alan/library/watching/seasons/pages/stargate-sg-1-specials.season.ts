import type { Season } from "../season.page-type.ts"

export const stargateSg1Specials = {
  id: "01a06802-b8be-7006-9fad-7ae1ae4ae053",
  pageTypeSlug: "season",
  slug: "stargate-sg-1-specials",
  title: "Stargate SG-1 Specials",
  partOfSlugs: ["stargate-sg-1"],
  position: 0,
  ownLength: 451.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2004-07-06",
  externalId: "trakt-season-14607",
  externalLink: "https://trakt.tv/shows/stargate-sg-1/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
