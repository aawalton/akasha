import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropTipTooltipsPl = {
  id: "01a061d6-3e3a-7aa9-962c-6609c9e2a0a4",
  type: "page-type/module",
  slug: "sets-drop-tip-tooltips-pl",
  definition: "the Polish explanation of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.722Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
