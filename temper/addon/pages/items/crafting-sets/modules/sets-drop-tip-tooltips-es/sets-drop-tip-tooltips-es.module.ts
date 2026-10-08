import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropTipTooltipsEs = {
  id: "01a061d6-3e34-7669-8237-3aba71031bad",
  type: "page-type/module",
  slug: "sets-drop-tip-tooltips-es",
  definition: "the Spanish explanation of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.716Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
