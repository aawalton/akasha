import type { Season } from "../season.page-type.ts"

export const onePieceSeason19 = {
  id: "01a06802-b8bb-704d-b30b-45450d6286d6",
  pageTypeSlug: "season",
  slug: "one-piece-season-19",
  title: "One Piece Season 19",
  partOfSlugs: ["one-piece"],
  position: 19,
  ownLength: 1776,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-09-03",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/19",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
