import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesAdamsTorreNewOrleans1920 = {
  id: "019f1e68-9796-764d-88f9-6bc158513583",
  pageTypeSlug: "chess-game",
  slug: "master-games-adams-torre-new-orleans-1920",
  title: "Edwin Ziegler Adams vs Carlos Torre Repetto · classical · 1920-01-01",
  externalId: "master-games_adams-torre-new-orleans-1920",
  white: "Edwin Ziegler Adams",
  black: "Carlos Torre Repetto",
  playedAt: "1920-01-01T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 45,
  source: "master-games",
  sourceGameId: "adams-torre-new-orleans-1920",
  handle: "master-games",
  openingName: "Philidor Defense",
  openingEco: "C41",
  pgn: "pgn",
} as const satisfies ChessGame
