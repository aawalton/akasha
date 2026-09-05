import type { Module } from "@akasha/code-system/module"

export const testStepLoading = {
  id: "01a06880-1000-7000-9000-000000000003",
  pageTypeSlug: "module",
  slug: "test-step-loading",
  definition: "the workspaces and test files a run reads off the tree before it composes a step",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A workspace whose manifest is absent or will not parse is left out rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace with no name in its manifest is named by its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file under a fixtures folder is no test file.",
    },
    {
      invariantKind: "departure",
      statement: "The test files are answered in order.",
    },
    {
      invariantKind: "departure",
      statement:
        "A typed test file is one ending in a known kind, and every test file is read apart from the typed ones.",
    },
  ],
} as const satisfies Module
