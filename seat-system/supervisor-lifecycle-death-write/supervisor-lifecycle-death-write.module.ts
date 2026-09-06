import type { Module } from "@akasha/code/module"

export const supervisorLifecycleDeathWrite = {
  id: "01a06838-5a84-7002-b23a-fa3c1a68a559",
  pageTypeSlug: "module",
  slug: "supervisor-lifecycle-death-write",
  definition: "whether a supervisor on its way down writes that its seat stopped",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A supervisor going down to re-exec writes no stopped status.",
    },
    {
      invariantKind: "departure",
      statement: "The seat of a supervisor going down to re-exec is not stopping.",
    },
    {
      invariantKind: "departure",
      statement: "Every other way down writes the stopped status.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes anything.",
    },
    {
      invariantKind: "absence",
      statement: "Only the writing is decided.",
    },
  ],
} as const satisfies Module
