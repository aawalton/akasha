import type { ChessGame } from "../../chess-game.page-type.ts"

export const masterGamesHamppeMeitnerVienna1872 = {
  id: "019f1e68-979e-7d15-8b0f-d7a33115817f",
  pageTypeSlug: "chess-game",
  slug: "master-games-hamppe-meitner-vienna-1872",
  title: "Carl Hamppe vs Philipp Meitner · classical · 1872-01-01",
  externalId: "master-games_hamppe-meitner-vienna-1872",
  white: "Carl Hamppe",
  black: "Philipp Meitner",
  playedAt: "1872-01-01T00:00:00.000Z",
  rated: false,
  variant: "standard",
  speed: "classical",
  result: "1/2-1/2",
  winner: "draw",
  ply: 36,
  source: "master-games",
  sourceGameId: "hamppe-meitner-vienna-1872",
  handle: "master-games",
  openingName: "Vienna Game, Hamppe-Meitner Variation",
  openingEco: "C25",
  pgn: "pgn",
} as const satisfies ChessGame
