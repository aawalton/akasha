import type { chessOutcome } from "./chess-outcome.select-property.ts"

export type ChessOutcome = (typeof chessOutcome.values)[number]
