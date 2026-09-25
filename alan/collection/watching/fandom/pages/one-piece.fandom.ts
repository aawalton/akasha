import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const onePiece = {
  id: "01a06808-5078-7004-8cd8-a8dfbe594845",
  type: "page-type/fandom",
  slug: "one-piece",
  title: "One Piece",
  partOfCollections: ["fandom-collection/anime-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  grade: "B",
  publishedAt: "1999-10-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Fandom
