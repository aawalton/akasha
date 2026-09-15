import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPiecePieceByPiece = {
  id: "01a0a5ae-ddc5-7cf5-bcac-e618b4d017cd",
  type: "page-type/track",
  slug: "kelly-clarkson-piece-by-piece-piece-by-piece",
  ownLength: 4.2957833333333335,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-piece-by-piece"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15P4Osep3FIiZvDoccy1HK",
      externalLink: "https://open.spotify.com/track/15P4Osep3FIiZvDoccy1HK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Piece by Piece",
} as const satisfies Track
