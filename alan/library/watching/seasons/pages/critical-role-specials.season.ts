import type { Season } from "../season.page-type.ts"

export const criticalRoleSpecials = {
  id: "01a06802-b8b8-7044-9542-b372c39f0980",
  pageTypeSlug: "season",
  slug: "critical-role-specials",
  title: "Critical Role Specials",
  partOfSlugs: ["critical-role"],
  position: 0,
  ownLength: 24866.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2014-09-16",
  externalId: "trakt-season-114153",
  externalLink: "https://trakt.tv/shows/critical-role/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
