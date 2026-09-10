import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { ChessGame } from "./properties/chess-game.relation-property.types.ts"
import type { ChessReviewSessionNotes } from "./properties/chess-review-session-notes.file-property.ts"
import type { ReviewedAt } from "./properties/reviewed-at.instant-property.types.ts"

export type ChessReviewSession = Page & {
  title: Title
  chessGame: ChessGame
  reviewedAt: ReviewedAt
  notes: ChessReviewSessionNotes
}
