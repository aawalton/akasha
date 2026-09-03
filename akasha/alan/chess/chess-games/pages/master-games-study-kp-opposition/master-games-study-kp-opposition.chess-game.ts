import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesStudyKpOpposition = {
  id: "019f248f-e850-7205-8e06-f4cafc478427",
  pageTypeSlug: "chess-game",
  slug: "master-games-study-kp-opposition",
  title: "King and pawn vs King (the opposition) · classical · 1900-01-01",
  externalId: "master-games_study-kp-opposition",
  white: "King and pawn",
  black: "King (the opposition)",
  playedAt: "1900-01-01T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 24,
  source: "master-games",
  sourceGameId: "study-kp-opposition",
  handle: "master-games",
  lesson:
    "K+P endgame: the opposition - keep your king in front of the pawn, take the opposition, and outflank to force promotion",
  collection: "endgame-classics",
  fen: "8/8/4k3/8/4K3/4P3/8/8 b - - 0 1",
  pgn: "pgn",
} as const satisfies ChessGame
