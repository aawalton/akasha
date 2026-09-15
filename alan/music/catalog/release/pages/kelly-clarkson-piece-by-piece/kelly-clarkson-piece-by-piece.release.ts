import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonPieceByPiece = {
  id: "01a0676a-d726-707d-91b8-8459ab34a8e6",
  type: "release",
  slug: "kelly-clarkson-piece-by-piece",
  title: "Piece by Piece",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 4.295783,
  ownProgress: 4.295783,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-02-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eyzZODcilyOlNvTYPdHc6",
      externalLink: "https://open.spotify.com/album/2eyzZODcilyOlNvTYPdHc6",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
