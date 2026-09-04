import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesZukertortBlackburneLondon1883 = {
  id: "019f1e68-978d-79e2-9d08-c149b5ef540a",
  pageTypeSlug: "chess-game",
  slug: "master-games-zukertort-blackburne-london-1883",
  title: "Johannes Zukertort vs Joseph Henry Blackburne · classical · 1883-05-05",
  externalId: "master-games_zukertort-blackburne-london-1883",
  white: "Johannes Zukertort",
  black: "Joseph Henry Blackburne",
  playedAt: "1883-05-05T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 65,
  source: "master-games",
  sourceGameId: "zukertort-blackburne-london-1883",
  handle: "master-games",
  openingName: "English Opening",
  openingEco: "A13",
  pgn: "pgn",
} as const satisfies ChessGame
