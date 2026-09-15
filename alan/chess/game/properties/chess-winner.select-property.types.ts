import type { chessWinner } from "akasha/alan/chess/game/properties/chess-winner.select-property.ts"

export type ChessWinner = (typeof chessWinner.values)[number]
