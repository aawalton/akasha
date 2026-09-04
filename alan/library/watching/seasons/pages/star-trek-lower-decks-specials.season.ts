import type { Season } from "../season.page-type.ts"

export const starTrekLowerDecksSpecials = {
  id: "01a06802-b8bd-7008-9238-6e1e28e56701",
  pageTypeSlug: "season",
  slug: "star-trek-lower-decks-specials",
  title: "Star Trek: Lower Decks Specials",
  partOfSlugs: ["star-trek-lower-decks"],
  position: 0,
  ownLength: 403.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2020-07-23",
  externalId: "trakt-season-225178",
  externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
