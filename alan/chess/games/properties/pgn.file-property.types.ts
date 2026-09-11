import type { pgn } from "akasha/alan/chess/games/properties/pgn.file-property.ts"

export type Pgn = (typeof pgn.extensions)[number]
