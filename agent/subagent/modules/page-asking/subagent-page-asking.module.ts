import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentPageAsking = {
  id: "01a0d6cf-cc39-7c30-868c-f29c9adff316",
  type: "page-type/module",
  slug: "subagent-page-asking",
  definition:
    "a landing of a subagent's page asked for without loading the program that lands the page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing is asked for by starting the program that lands the page and not waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What that program says goes to the log in the seat's own folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The program that lands the page is found through the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is named by the page the index carries for its id.",
    },
  ],
} as const satisfies Module
