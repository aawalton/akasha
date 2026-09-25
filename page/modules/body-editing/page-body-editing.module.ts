import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageBodyEditing = {
  id: "01a0d918-34bb-72b7-be24-ba6fdc394319",
  type: "page-type/module",
  slug: "page-body-editing",
  definition: "the TypeScript a page already is, edited where its values changed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a key whose value changed is edited, and every other byte is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key whose value changed has that value replaced and keeps its own text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the values no longer carry goes with the line that key sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page lacked is put on a line of its own after the key before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value changed or put in is written as JSON, as a new body writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body whose values are all unchanged is answered as the same text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body this cannot edit is answered as none, and the caller writes it whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits are worked one at a time, each over the body the last one left.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here formats the body this module edited.",
    },
  ],
} as const satisfies Module
