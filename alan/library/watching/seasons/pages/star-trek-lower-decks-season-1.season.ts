import type { Season } from "../season.page-type.ts"

export const starTrekLowerDecksSeason1 = {
  id: "01a06802-b8bd-7003-af1c-95a5e27bcb23",
  pageTypeSlug: "season",
  slug: "star-trek-lower-decks-season-1",
  title: "Star Trek: Lower Decks Season 1",
  partOfSlugs: ["star-trek-lower-decks"],
  position: 1,
  ownLength: 267,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-08-06",
  externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
