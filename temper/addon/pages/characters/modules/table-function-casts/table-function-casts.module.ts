import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tableFunctionCasts = {
  id: "01a06052-2ca5-78e3-9cd6-62ac3cdd5bed",
  type: "page-type/module",
  slug: "table-function-casts",
  definition: "what an unknown handed to a table helper is taken as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A helper takes an unknown so a caller in Lua may hand in anything.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
  createdAt: "2026-09-02T04:13:13.253Z",
  updatedAt: "2026-09-22T13:28:06.000Z",
} as const satisfies Module
