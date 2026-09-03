import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesKarpovUnzickerNice1974 = {
  id: "019f248f-e85c-7235-b9ff-aca1bd51b7be",
  pageTypeSlug: "chess-game",
  slug: "master-games-karpov-unzicker-nice-1974",
  title: "Anatoly Karpov vs Wolfgang Unzicker · classical · 1974-06-18",
  externalId: "master-games_karpov-unzicker-nice-1974",
  white: "Anatoly Karpov",
  black: "Wolfgang Unzicker",
  playedAt: "1974-06-18T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1-0",
  winner: "white",
  ply: 87,
  source: "master-games",
  sourceGameId: "karpov-unzicker-nice-1974",
  handle: "master-games",
  openingName: "Ruy Lopez, Closed, Chigorin Defense",
  openingEco: "C98",
  lesson:
    "Positional squeeze: clamp the position (Ba7!), trade nothing useful, improve every piece until the defense runs out of moves",
  collection: "positional-masterpieces",
  pgn: "pgn",
} as const satisfies ChessGame
