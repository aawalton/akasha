import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesBotvinnikKeresMoscow1952 = {
  id: "019f248f-e85d-7f24-9e34-2a70141d75a2",
  pageTypeSlug: "chess-game",
  slug: "master-games-botvinnik-keres-moscow-1952",
  title: "Mikhail Botvinnik vs Paul Keres · classical · 1952-12-09",
  externalId: "master-games_botvinnik-keres-moscow-1952",
  white: "Mikhail Botvinnik",
  black: "Paul Keres",
  playedAt: "1952-12-09T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 73,
  source: "master-games",
  sourceGameId: "botvinnik-keres-moscow-1952",
  handle: "master-games",
  openingName: "Queen's Gambit Declined, Exchange Variation",
  openingEco: "D35",
  lesson:
    "Closed structures: QGD Exchange / Carlsbad pawn formation - the central f3-e4 expansion plan and the kingside attack it feeds",
  collection: "closed-structures",
  pgn: "pgn",
} as const satisfies ChessGame
