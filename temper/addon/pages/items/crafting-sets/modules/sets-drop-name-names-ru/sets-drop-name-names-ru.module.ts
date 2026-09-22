import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameNamesRu = {
  id: "01a061d6-3e2b-7bbe-ae58-63f588a6807a",
  type: "page-type/module",
  slug: "sets-drop-name-names-ru",
  definition: "the Russian name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
