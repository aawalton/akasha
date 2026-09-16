import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditRecording = {
  id: "01a0aa80-f294-72e3-b796-a0ad8f7a69c3",
  type: "page-type/module",
  slug: "audit-recording",
  definition: "what an audit learned, sent to the pages service rather than into the tree it holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What an audit learned is sent to the pages service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree an audit holds is read and never written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is sent as one line, and the append puts the newline on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may put a recorder of its own in place of the pages service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row the pages refused answers as no file part rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a row answers for is read from the tree the audit holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row already measured is sent without being measured again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a check.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a verdict back.",
    },
  ],
} as const satisfies Module
