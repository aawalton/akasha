import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesTaimanovNajdorfZurich1953 = {
  id: "019f248f-e85f-7b5d-86bc-e24efca32c90",
  pageTypeSlug: "chess-game",
  slug: "master-games-taimanov-najdorf-zurich-1953",
  title: "Mark Taimanov vs Miguel Najdorf · classical · 1953-09-05",
  externalId: "master-games_taimanov-najdorf-zurich-1953",
  white: "Mark Taimanov",
  black: "Miguel Najdorf",
  playedAt: "1953-09-05T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "0-1",
  winner: "black",
  ply: 85,
  source: "master-games",
  sourceGameId: "taimanov-najdorf-zurich-1953",
  handle: "master-games",
  openingName: "King's Indian Defense, Orthodox, Aronin-Taimanov",
  openingEco: "E99",
  lesson:
    "Closed structures: King's Indian - locked center, race on opposite wings, and the ...g5-g4-g3 kingside pawn storm",
  collection: "closed-structures",
  pgn: "pgn",
} as const satisfies ChessGame
