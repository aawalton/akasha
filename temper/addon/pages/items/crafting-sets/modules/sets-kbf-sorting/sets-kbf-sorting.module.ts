import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsKbfSorting = {
  id: "01a0623e-53a1-7fe8-aa65-3bdbcb7ee465",
  type: "page-type/module",
  slug: "sets-kbf-sorting",
  definition: "how a filter dropdown's entries are put in order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Sorting is offered only on the row fields the sort table names.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.945Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
