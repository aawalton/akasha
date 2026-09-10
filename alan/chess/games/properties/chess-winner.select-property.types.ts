import type { chessWinner } from "./chess-winner.select-property.ts"

export type ChessWinner = (typeof chessWinner.values)[number]
