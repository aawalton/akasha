import type { Season } from "../season.page-type.ts"

export const starTrekLowerDecksSeason4 = {
  id: "01a06802-b8bd-7006-9f4e-8788b1eb62bb",
  pageTypeSlug: "season",
  slug: "star-trek-lower-decks-season-4",
  title: "Star Trek: Lower Decks Season 4",
  partOfSlugs: ["star-trek-lower-decks"],
  position: 4,
  ownLength: 264,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-09-07",
  externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
