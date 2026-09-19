import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treeTurning = {
  id: "01a0ba7d-9193-7498-8bf2-4ba35684f91e",
  type: "page-type/module",
  slug: "tree-turning",
  definition: "which of the landing's pictures a change moves, answered from the change alone",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a picture moved is answered from the paths a change names and what those paths held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming no page of its own moves no picture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer here errs toward drawing, so a picture drawn again is allowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that came, went, or stopped parsing moves every picture it could reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file recording what names a page moves the pictures the domains carry.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index, or a page the change does not name.",
    },
  ],
} as const satisfies Module
