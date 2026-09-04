import type { Season } from "../season.page-type.ts"

export const sherlockSpecials = {
  id: "01a06802-b8bc-703d-b3fb-60cfe763e022",
  pageTypeSlug: "season",
  slug: "sherlock-specials",
  title: "Sherlock Specials",
  partOfSlugs: ["sherlock"],
  position: 0,
  ownLength: 367.8,
  ownProgress: 367.8,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2010-08-30",
  externalId: "trakt-season-30834",
  externalLink: "https://trakt.tv/shows/sherlock/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
