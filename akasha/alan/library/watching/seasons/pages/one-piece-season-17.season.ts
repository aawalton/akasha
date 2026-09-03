import type { Season } from "../season.page-type.ts"

export const onePieceSeason17 = {
  id: "01a06802-b8bb-704b-ab7c-13d0ed37dad7",
  pageTypeSlug: "season",
  slug: "one-piece-season-17",
  title: "One Piece Season 17",
  partOfSlugs: ["one-piece"],
  position: 17,
  ownLength: 1344,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-05-17",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/17",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
