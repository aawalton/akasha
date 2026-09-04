import type { Season } from "../season.page-type.ts"

export const starTrekLowerDecksSeason5 = {
  id: "01a06802-b8bd-7007-934a-e85a8f60dabb",
  pageTypeSlug: "season",
  slug: "star-trek-lower-decks-season-5",
  title: "Star Trek: Lower Decks Season 5",
  partOfSlugs: ["star-trek-lower-decks"],
  position: 5,
  ownLength: 271.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-10-24",
  externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
