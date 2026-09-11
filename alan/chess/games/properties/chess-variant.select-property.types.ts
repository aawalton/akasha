import type { chessVariant } from "akasha/alan/chess/games/properties/chess-variant.select-property.ts"

export type ChessVariant = (typeof chessVariant.values)[number]
