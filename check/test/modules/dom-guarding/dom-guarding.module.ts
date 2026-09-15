import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domGuarding = {
  id: "01a06558-bbb0-7000-8634-6cb45e4b961e",
  type: "module",
  slug: "dom-guarding",
  definition: "telling a component test that ran without a browser what it is missing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A test naming itself a component test is the test this guards.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that has a document is let through whatever the test is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing document is said as a boolean rather than thrown.",
    },
  ],
} as const satisfies Module
