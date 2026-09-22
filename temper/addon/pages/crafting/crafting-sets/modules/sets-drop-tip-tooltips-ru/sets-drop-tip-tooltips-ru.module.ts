import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropTipTooltipsRu = {
  id: "01a061d6-3e3e-7749-b195-d622b0265798",
  type: "page-type/module",
  slug: "sets-drop-tip-tooltips-ru",
  definition: "the Russian explanation of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
