import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropTipTooltipsFr = {
  id: "01a061d6-3e35-777b-9a89-3f9ce865ee2d",
  type: "page-type/module",
  slug: "sets-drop-tip-tooltips-fr",
  definition: "the French explanation of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.717Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
