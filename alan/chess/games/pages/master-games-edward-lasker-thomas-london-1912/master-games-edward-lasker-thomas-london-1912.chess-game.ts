import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesEdwardLaskerThomasLondon1912 = {
  id: "019f1e68-979b-7b22-bac4-bce37e8628ac",
  pageTypeSlug: "chess-game",
  slug: "master-games-edward-lasker-thomas-london-1912",
  title: "Edward Lasker vs George Alan Thomas · classical · 1912-10-29",
  externalId: "master-games_edward-lasker-thomas-london-1912",
  white: "Edward Lasker",
  black: "George Alan Thomas",
  playedAt: "1912-10-29T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 35,
  source: "master-games",
  sourceGameId: "edward-lasker-thomas-london-1912",
  handle: "master-games",
  openingName: "Dutch Defense",
  openingEco: "A80",
  pgn: "pgn",
} as const satisfies ChessGame
