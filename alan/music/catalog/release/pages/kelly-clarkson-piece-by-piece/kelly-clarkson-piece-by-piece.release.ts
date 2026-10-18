import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonPieceByPiece = {
  id: "01a0676a-d726-707d-91b8-8459ab34a8e6",
  type: "page-type/release",
  slug: "kelly-clarkson-piece-by-piece",
  title: "Piece by Piece",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
