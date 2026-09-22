import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameNamesZh = {
  id: "01a061d6-3e2c-73a9-8d2e-a0f72c7e4c88",
  type: "page-type/module",
  slug: "sets-drop-name-names-zh",
  definition: "the Chinese name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
