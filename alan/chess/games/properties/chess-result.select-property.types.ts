import type { chessResult } from "./chess-result.select-property.ts"

export type ChessResult = (typeof chessResult.values)[number]
