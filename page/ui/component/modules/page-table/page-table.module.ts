import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTable = {
  id: "01a06257-46f3-77d1-a828-191dbbd5a2c1",
  type: "page-type/module",
  slug: "page-table",
  definition: "the rows of a view shown as a table",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A table credits each column's source beneath its rows, once for each credit.",
    },
  ],
  createdAt: "2026-09-02T13:38:02.099Z",
  updatedAt: "2026-10-28T19:58:16.866Z",
} as const satisfies Module
