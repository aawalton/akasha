import type { Season } from "../season.page-type.ts"

export const youngSheldonSpecials = {
  id: "01a06802-b8c0-7029-8b87-07746f2f2cf5",
  pageTypeSlug: "season",
  slug: "young-sheldon-specials",
  title: "Young Sheldon Specials",
  partOfSlugs: ["young-sheldon"],
  position: 0,
  ownLength: 75,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2017-05-29",
  externalId: "trakt-season-148590",
  externalLink: "https://trakt.tv/shows/young-sheldon/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
