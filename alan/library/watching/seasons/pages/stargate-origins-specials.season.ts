import type { Season } from "../season.page-type.ts"

export const stargateOriginsSpecials = {
  id: "01a06802-b8bd-704c-a906-d3f3881497a1",
  pageTypeSlug: "season",
  slug: "stargate-origins-specials",
  title: "Stargate Origins Specials",
  partOfSlugs: ["stargate-origins"],
  position: 0,
  ownLength: 103.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2018-06-19",
  externalId: "trakt-season-160724",
  externalLink: "https://trakt.tv/shows/stargate-origins/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
