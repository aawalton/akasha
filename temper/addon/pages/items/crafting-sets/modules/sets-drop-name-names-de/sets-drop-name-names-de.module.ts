import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameNamesDe = {
  id: "01a061d6-3e26-74aa-b888-20006a0d5efa",
  type: "page-type/module",
  slug: "sets-drop-name-names-de",
  definition: "the German name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.702Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
