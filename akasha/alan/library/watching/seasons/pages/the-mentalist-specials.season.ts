import type { Season } from "../season.page-type.ts"

export const theMentalistSpecials = {
  id: "01a06802-b8bf-7023-828e-0925dce21d89",
  pageTypeSlug: "season",
  slug: "the-mentalist-specials",
  title: "The Mentalist Specials",
  partOfSlugs: ["the-mentalist"],
  position: 0,
  ownLength: 39,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2009-08-21",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/the-mentalist/seasons/0",
  lastSyncedAt: "2026-01-01",
} as const satisfies Season
