import type { chessResult } from "akasha/alan/chess/games/properties/chess-result.select-property.ts"

export type ChessResult = (typeof chessResult.values)[number]
