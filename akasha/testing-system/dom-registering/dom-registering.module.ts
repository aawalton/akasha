import type { Module } from "@akasha/code-system/module"

export const domRegistering = {
  id: "01a06558-bbb0-7002-bf4b-d065ea2a2ada",
  pageTypeSlug: "module",
  slug: "dom-registering",
  definition: "putting a document up before a component test runs and taking it away after",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The test runner preloads the module rather than a test importing the module.",
    },
    {
      invariantKind: "departure",
      statement: "The fetch the runtime came with is kept across the document being registered.",
    },
    {
      invariantKind: "departure",
      statement: "What one test rendered is taken away before the next test runs.",
    },
    {
      invariantKind: "absence",
      statement: "The module declares no name a test reaches for.",
    },
  ],
} as const satisfies Module
