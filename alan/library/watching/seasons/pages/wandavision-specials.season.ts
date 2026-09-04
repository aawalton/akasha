import type { Season } from "../season.page-type.ts"

export const wandavisionSpecials = {
  id: "01a06802-b8c0-700f-b630-9d1ea3f0dc87",
  pageTypeSlug: "season",
  slug: "wandavision-specials",
  title: "WandaVision Specials",
  partOfSlugs: ["wandavision"],
  position: 0,
  ownLength: 10.2,
  ownProgress: 10.2,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2023-11-28",
  externalId: "trakt-season-435083",
  externalLink: "https://trakt.tv/shows/wandavision/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
