import type { Season } from "../season.page-type.ts"

export const scorpionSpecials = {
  id: "01a06802-b8bc-7031-80d9-2c4854f5c941",
  pageTypeSlug: "season",
  slug: "scorpion-specials",
  title: "Scorpion Specials",
  partOfSlugs: ["scorpion"],
  position: 0,
  ownLength: 49.8,
  ownProgress: 49.8,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2014-08-13",
  externalId: "trakt-season-96845",
  externalLink: "https://trakt.tv/shows/scorpion/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
