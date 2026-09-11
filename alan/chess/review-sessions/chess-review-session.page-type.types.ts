import type { ChessGame } from "akasha/alan/chess/review-sessions/properties/chess-game.relation-property.types.ts"
import type { ChessReviewSessionNotes } from "akasha/alan/chess/review-sessions/properties/chess-review-session-notes.file-property.ts"
import type { ReviewedAt } from "akasha/alan/chess/review-sessions/properties/reviewed-at.instant-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type ChessReviewSession = Page & {
  title: Title
  chessGame: ChessGame
  reviewedAt: ReviewedAt
  notes: ChessReviewSessionNotes
}
