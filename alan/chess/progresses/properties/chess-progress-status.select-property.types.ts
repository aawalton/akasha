import type { chessProgressStatus } from "akasha/alan/chess/progresses/properties/chess-progress-status.select-property.ts"

export type ChessProgressStatus = (typeof chessProgressStatus.values)[number]
