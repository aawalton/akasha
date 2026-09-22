import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingConstants = {
  id: "01a06113-b7cd-70cb-83dd-840a25b71d13",
  type: "page-type/module",
  slug: "housing-constants",
  definition: "the tab, sort, filter and port-mode numbers working the housing window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A number saved under a player's settings keeps the meaning that number had.",
    },
  ],
} as const satisfies Module
