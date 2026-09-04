import type { Season } from "../season.page-type.ts"

export const onePieceSeason20 = {
  id: "01a06802-b8bb-704f-80dd-528df5460247",
  pageTypeSlug: "season",
  slug: "one-piece-season-20",
  title: "One Piece Season 20",
  partOfSlugs: ["one-piece"],
  position: 20,
  ownLength: 336,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-03-31",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/20",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
