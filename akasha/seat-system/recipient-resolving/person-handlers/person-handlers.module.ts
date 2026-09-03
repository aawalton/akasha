import type { Module } from "@akasha/code-system/module"

export const personHandlers = {
  id: "01a0691b-4f64-73b2-8015-87e24cab720b",
  pageTypeSlug: "module",
  slug: "person-handlers",
  definition: "every person standing, paired with the persona who answers them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A person nobody answers is warned about and left out rather than refusing the list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here resolves a recipient.",
    },
  ],
} as const satisfies Module
