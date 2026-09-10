import type { chessVariant } from "./chess-variant.select-property.ts"

export type ChessVariant = (typeof chessVariant.values)[number]
