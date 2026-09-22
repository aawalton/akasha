import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipState = {
  id: "01a06231-8f1e-7f5a-b604-b1c73086938c",
  type: "page-type/module",
  slug: "sets-tip-state",
  definition: "the mutable tooltip state holding setting flags and per-set scratch tables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One shared object has the state for every tooltip the library touches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scratch tables are cleared and refilled for each set rather than made fresh.",
    },
  ],
} as const satisfies Module
