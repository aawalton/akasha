import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const chessProgress = {
  id: "01a06582-bd62-702f-92a4-3fd313251ee2",
  type: "page-type/page-type",
  slug: "chess-progress",
  definition: "how far a part of Alan's chess has come",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "boolean-property/active-drill",
    "calendar-date-property/last-reviewed",
    "select-property/chess-progress-status",
    "select-property/mastery-level",
    "text-property/motif-id",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/category", required: true, many: false },
    { pageProperty: "select-property/chess-progress-status", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/motif-id", required: false, many: false },
    { pageProperty: "select-property/mastery-level", required: false, many: false },
    { pageProperty: "calendar-date-property/last-reviewed", required: false, many: false },
    { pageProperty: "boolean-property/active-drill", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose written about a part of Alan's chess is its description.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of category `motif` names the motif that page is about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A motif is named by the Lichess theme the puzzle rows have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose here is Alan's coach writing about Alan rather than akasha's own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
