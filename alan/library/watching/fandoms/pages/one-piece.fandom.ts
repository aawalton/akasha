import type { Fandom } from "../fandom.page-type.ts"

export const onePiece = {
  id: "01a06808-5078-7004-8cd8-a8dfbe594845",
  pageTypeSlug: "fandom",
  slug: "one-piece",
  title: "One Piece",
  partOfSlugs: ["anime-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
  rank: "B",
  publishedAt: "1999-10-20",
  externalLink: "https://trakt.tv/shows/one-piece",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
