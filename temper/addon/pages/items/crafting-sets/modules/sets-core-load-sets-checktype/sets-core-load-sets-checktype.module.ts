import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreLoadSetsChecktype = {
  id: "01a061fc-ceec-7e93-b553-13609258078f",
  type: "page-type/module",
  slug: "sets-core-load-sets-checktype",
  definition: "sorting each set into its type table and filing where it drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A set whose items no longer exist is erased from every preloaded table with that set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Perfected and non-perfected pairs are learned from the game rather than from the data.",
    },
  ],
} as const satisfies Module
