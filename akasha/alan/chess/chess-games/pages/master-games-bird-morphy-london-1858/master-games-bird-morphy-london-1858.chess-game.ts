import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesBirdMorphyLondon1858 = {
  id: "019f1e68-9799-7f36-9f9b-065a9607e6e5",
  pageTypeSlug: "chess-game",
  slug: "master-games-bird-morphy-london-1858",
  title: "Henry Bird vs Paul Morphy · classical · 1858-01-01",
  externalId: "master-games_bird-morphy-london-1858",
  white: "Henry Bird",
  black: "Paul Morphy",
  playedAt: "1858-01-01T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "0-1",
  winner: "black",
  ply: 58,
  source: "master-games",
  sourceGameId: "bird-morphy-london-1858",
  handle: "master-games",
  openingName: "Philidor Defense, Philidor Countergambit",
  openingEco: "C41",
  pgn: "pgn",
} as const satisfies ChessGame
