import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipCondenseZoneRows = {
  id: "01a06231-8f1f-78f5-97c7-1f55147e7bd8",
  type: "page-type/module",
  slug: "sets-tip-condense-zone-rows",
  definition: "folding away zone rows that repeat the same names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row counts as a duplicate only when every name field matches.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.207Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
