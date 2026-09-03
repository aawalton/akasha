import type { Season } from "../season.page-type.ts"

export const starTrekLowerDecksSeason3 = {
  id: "01a06802-b8bd-7005-aa76-11b410cd03a3",
  pageTypeSlug: "season",
  slug: "star-trek-lower-decks-season-3",
  title: "Star Trek: Lower Decks Season 3",
  partOfSlugs: ["star-trek-lower-decks"],
  position: 3,
  ownLength: 276,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-08-25",
  externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
