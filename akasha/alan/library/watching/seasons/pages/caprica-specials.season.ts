import type { Season } from "../season.page-type.ts"

export const capricaSpecials = {
  id: "01a06802-b8b8-7024-a2bc-093c94fbd674",
  pageTypeSlug: "season",
  slug: "caprica-specials",
  title: "Caprica Specials",
  partOfSlugs: ["caprica"],
  position: 0,
  ownLength: 61.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2009-04-22",
  externalId: "trakt-season-2810",
  externalLink: "https://trakt.tv/shows/caprica/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
