import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesLevitskyMarshallBreslau1912 = {
  id: "019f1e68-9798-735d-9417-82c24077dd86",
  pageTypeSlug: "chess-game",
  slug: "master-games-levitsky-marshall-breslau-1912",
  title: "Stepan Levitsky vs Frank Marshall · classical · 1912-07-20",
  externalId: "master-games_levitsky-marshall-breslau-1912",
  white: "Stepan Levitsky",
  black: "Frank Marshall",
  playedAt: "1912-07-20T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "0-1",
  winner: "black",
  ply: 46,
  source: "master-games",
  sourceGameId: "levitsky-marshall-breslau-1912",
  handle: "master-games",
  openingName: "French Defense",
  openingEco: "C10",
  pgn: "pgn",
} as const satisfies ChessGame
