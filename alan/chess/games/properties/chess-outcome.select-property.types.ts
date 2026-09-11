import type { chessOutcome } from "akasha/alan/chess/games/properties/chess-outcome.select-property.ts"

export type ChessOutcome = (typeof chessOutcome.values)[number]
