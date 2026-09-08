import type { Module } from "@akasha/code/module"

export const testStepLoading = {
  id: "01a06880-1000-7000-9000-000000000003",
  pageTypeSlug: "module",
  slug: "test-step-loading",
  definition:
    "the workspaces a root manifest declares, each read off the checkout with its own manifest",
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
  ],
} as const satisfies Module
