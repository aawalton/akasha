import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameNamesEs = {
  id: "01a061d6-3e27-7aae-9c54-e5c7041783c1",
  type: "page-type/module",
  slug: "sets-drop-name-names-es",
  definition: "the Spanish name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.703Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
