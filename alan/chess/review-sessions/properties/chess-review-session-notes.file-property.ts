import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type ChessReviewSessionNotes = "txt"

export const chessReviewSessionNotes = {
  id: "01a06860-e6f6-7291-9d0a-1f69cadd2a5d",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "chess-review-session-notes",
  propertySlug: "notes",
  definition: "what the coach said as a game was stepped through",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The notes are the words said at the board rather than a summary written after.",
    },
  ],
} as const satisfies FileProperty
