import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesLaskerBauerAmsterdam1889 = {
  id: "019f1e68-9790-7618-a401-390b97082396",
  pageTypeSlug: "chess-game",
  slug: "master-games-lasker-bauer-amsterdam-1889",
  title: "Emanuel Lasker vs Johann Hermann Bauer · classical · 1889-08-26",
  externalId: "master-games_lasker-bauer-amsterdam-1889",
  white: "Emanuel Lasker",
  black: "Johann Hermann Bauer",
  playedAt: "1889-08-26T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 75,
  source: "master-games",
  sourceGameId: "lasker-bauer-amsterdam-1889",
  handle: "master-games",
  openingName: "Bird's Opening, Dutch Variation",
  openingEco: "A03",
  pgn: "pgn",
} as const satisfies ChessGame
