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
} as const satisfies Module
