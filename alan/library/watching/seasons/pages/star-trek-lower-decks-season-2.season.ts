import type { Season } from "../season.page-type.ts"

export const starTrekLowerDecksSeason2 = {
  id: "01a06802-b8bd-7004-83cc-9170f657ca25",
  pageTypeSlug: "season",
  slug: "star-trek-lower-decks-season-2",
  title: "Star Trek: Lower Decks Season 2",
  partOfSlugs: ["star-trek-lower-decks"],
  position: 2,
  ownLength: 268.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-08-12",
  externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
