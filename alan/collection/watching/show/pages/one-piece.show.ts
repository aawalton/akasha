import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const onePiece = {
  id: "01a18468-749e-7ec0-95e5-e372ecbbefae",
  type: "page-type/show",
  slug: "one-piece",
  title: "One Piece",
  streamingOn: [
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
  ],
  partOfCollections: ["fandom/one-piece"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "paused",
  publishedAt: "1999-10-20",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37854",
      externalLink: "https://www.themoviedb.org/tv/37854",
      lastSyncedAt: "2026-10-28",
    },
  ],
  createdAt: "2026-10-28T21:26:40.541Z",
  updatedAt: "2026-10-28T21:27:51.265Z",
} as const satisfies Show
