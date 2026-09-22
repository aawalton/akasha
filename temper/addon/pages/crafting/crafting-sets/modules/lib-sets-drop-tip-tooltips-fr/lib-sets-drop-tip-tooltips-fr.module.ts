import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDropTipTooltipsFr = {
  id: "01a061d6-3e35-777b-9a89-3f9ce865ee2d",
  type: "page-type/module",
  slug: "lib-sets-drop-tip-tooltips-fr",
  definition: "the French explanation of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
