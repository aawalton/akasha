import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesCapablancaTartakowerNewYork1924 = {
  id: "019f248f-e85a-7419-a0ac-2b7323a94284",
  pageTypeSlug: "chess-game",
  slug: "master-games-capablanca-tartakower-new-york-1924",
  title: "Jose Raul Capablanca vs Savielly Tartakower · classical · 1924-03-23",
  externalId: "master-games_capablanca-tartakower-new-york-1924",
  white: "Jose Raul Capablanca",
  black: "Savielly Tartakower",
  playedAt: "1924-03-23T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 103,
  source: "master-games",
  sourceGameId: "capablanca-tartakower-new-york-1924",
  handle: "master-games",
  openingName: "Dutch Defense",
  openingEco: "A80",
  lesson:
    "Positional technique: Capablanca's model conversion - the active king marches in, the rook takes the seventh, and the passed pawn decides",
  collection: "positional-masterpieces",
  pgn: "pgn",
} as const satisfies ChessGame
