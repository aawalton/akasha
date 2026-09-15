import type { ChessGame } from "akasha/alan/chess/review-session/properties/chess-game.relation-property.types.ts"
import type { ChessReviewSessionNotes } from "akasha/alan/chess/review-session/properties/chess-review-session-notes.file-property.types.ts"
import type { ReviewedAt } from "akasha/alan/chess/review-session/properties/reviewed-at.instant-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ChessReviewSession = Page & {
  title: Title
  chessGame: ChessGame
  reviewedAt: ReviewedAt
  notes: ChessReviewSessionNotes
}
