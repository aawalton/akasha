import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropTipTooltipsZh = {
  id: "01a061d6-3e40-7401-94ea-975c5f3f2541",
  type: "page-type/module",
  slug: "sets-drop-tip-tooltips-zh",
  definition: "the Chinese explanation of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
