import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDropNameNamesDe = {
  id: "01a061d6-3e26-74aa-b888-20006a0d5efa",
  type: "page-type/module",
  slug: "lib-sets-drop-name-names-de",
  definition: "the German name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
