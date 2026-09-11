import type { chessWinner } from "akasha/alan/chess/games/properties/chess-winner.select-property.ts"

export type ChessWinner = (typeof chessWinner.values)[number]
