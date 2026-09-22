import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const chessReviewSessionNotes = {
  id: "01a06860-e6f6-7291-9d0a-1f69cadd2a5d",
  type: "page-type/file-property",
  slug: "chess-review-session-notes",
  propertySlug: "notes",
  definition: "what the coach said while stepping through a game",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The notes are the words said at the board rather than a summary written after.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
