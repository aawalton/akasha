import type { Season } from "../season.page-type.ts"

export const studioCSpecials = {
  id: "01a06802-b8be-7029-8d8e-a231487112ab",
  pageTypeSlug: "season",
  slug: "studio-c-specials",
  title: "Studio C Specials",
  partOfSlugs: ["studio-c"],
  position: 0,
  ownLength: 200,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2013-10-06",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/studio-c/seasons/0",
  lastSyncedAt: "2026-01-20",
} as const satisfies Season
