import type { Season } from "../season.page-type.ts"

export const peacemakerSpecials = {
  id: "01a06802-b8bc-7011-b867-4518179a3d36",
  pageTypeSlug: "season",
  slug: "peacemaker-specials",
  title: "Peacemaker Specials",
  partOfSlugs: ["peacemaker"],
  position: 0,
  ownLength: 55.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2022-11-23",
  externalId: "trakt-season-313219",
  externalLink: "https://trakt.tv/shows/peacemaker-2022/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
