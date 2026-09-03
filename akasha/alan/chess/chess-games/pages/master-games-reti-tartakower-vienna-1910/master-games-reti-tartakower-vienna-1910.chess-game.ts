import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesRetiTartakowerVienna1910 = {
  id: "019f1e68-9794-7a81-9985-1f4dc77af924",
  pageTypeSlug: "chess-game",
  slug: "master-games-reti-tartakower-vienna-1910",
  title: "Richard Réti vs Savielly Tartakower · classical · 1910-01-01",
  externalId: "master-games_reti-tartakower-vienna-1910",
  white: "Richard Réti",
  black: "Savielly Tartakower",
  playedAt: "1910-01-01T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 21,
  source: "master-games",
  sourceGameId: "reti-tartakower-vienna-1910",
  handle: "master-games",
  openingName: "Caro-Kann Defense",
  openingEco: "B15",
  pgn: "pgn",
} as const satisfies ChessGame
