import type { Season } from "../season.page-type.ts"

export const theLoneGunmenSpecials = {
  id: "01a06802-b8bf-7014-ad38-f2cca21b5ba0",
  pageTypeSlug: "season",
  slug: "the-lone-gunmen-specials",
  title: "The Lone Gunmen Specials",
  partOfSlugs: ["the-lone-gunmen-2001"],
  position: 0,
  ownLength: 90,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2002-04-22",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/the-lone-gunmen/seasons/0",
  lastSyncedAt: "2025-10-22",
} as const satisfies Season
