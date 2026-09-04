import type { Season } from "../season.page-type.ts"

export const stevenUniverseSpecials = {
  id: "01a06802-b8be-700f-8ed5-440e1315d874",
  pageTypeSlug: "season",
  slug: "steven-universe-specials",
  title: "Steven Universe Specials",
  partOfSlugs: ["steven-universe"],
  position: 0,
  ownLength: 214.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2013-05-21",
  externalId: "trakt-season-97190",
  externalLink: "https://trakt.tv/shows/steven-universe/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
