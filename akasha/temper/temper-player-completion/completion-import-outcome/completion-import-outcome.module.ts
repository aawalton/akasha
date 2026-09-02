import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionImportOutcome = {
  id: "01a06108-2fef-7f5e-8bcb-0e8fbd99a8ff",
  pageTypeSlug: "module",
  slug: "completion-import-outcome",
  definition: "what a merge did to a stored completion, and which fields the merge held back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
