import type { Module } from "@akasha/code-system/module"

export const libSetsKbfSorting = {
  id: "01a0623e-53a1-7fe8-aa65-3bdbcb7ee465",
  pageTypeSlug: "module",
  slug: "lib-sets-kbf-sorting",
  definition: "how a filter dropdown's entries are put in order",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Sorting is offered only on the row fields the sort table names.",
    },
  ],
} as const satisfies Module
