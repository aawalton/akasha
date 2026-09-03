import type { Season } from "../season.page-type.ts"

export const battlestarGalacticaSpecials = {
  id: "01a06802-b8b8-7002-a97b-c1d7440f42ee",
  pageTypeSlug: "season",
  slug: "battlestar-galactica-specials",
  title: "Battlestar Galactica Specials",
  partOfSlugs: ["battlestar-galactica-2004"],
  position: 0,
  ownLength: 289.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2003-11-26",
  externalId: "trakt-season-243232",
  externalLink: "https://trakt.tv/shows/battlestar-galactica-2003/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
