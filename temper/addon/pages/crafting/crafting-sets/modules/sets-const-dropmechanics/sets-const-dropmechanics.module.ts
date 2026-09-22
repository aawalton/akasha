import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsConstDropmechanics = {
  id: "01a061d6-3e22-7cb9-b1f5-2605e32ae7a6",
  type: "page-type/module",
  slug: "sets-const-dropmechanics",
  definition: "the forty ways a gear set can drop, each given a number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each drop mechanic number is exported under its name rather than kept in a table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The library declares zone ids the game does not have.",
    },
  ],
} as const satisfies Module
