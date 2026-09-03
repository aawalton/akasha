import type { Season } from "../season.page-type.ts"

export const theOfficeSpecials = {
  id: "01a06802-b8bf-702d-84cd-69b9e5de9178",
  pageTypeSlug: "season",
  slug: "the-office-specials",
  title: "The Office Specials",
  partOfSlugs: ["the-office"],
  position: 0,
  ownLength: 2514,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2005-01-01",
  externalId: "trakt-season-7608",
  externalLink: "https://trakt.tv/shows/the-office/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
