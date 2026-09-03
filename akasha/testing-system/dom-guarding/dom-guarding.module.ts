import type { Module } from "@akasha/code-system/module"

export const domGuarding = {
  id: "01a06558-bbb0-7000-8634-6cb45e4b961e",
  pageTypeSlug: "module",
  slug: "dom-guarding",
  definition: "telling a component test that ran without a browser what it is missing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test naming itself a component test is the one this guards.",
    },
    {
      invariantKind: "departure",
      statement: "A run that has a document is let through whatever the test is named.",
    },
    {
      invariantKind: "departure",
      statement: "What is missing is said as a boolean rather than thrown.",
    },
  ],
} as const satisfies Module
