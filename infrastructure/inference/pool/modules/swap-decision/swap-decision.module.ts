import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const swapDecision = {
  id: "01a06815-9efd-7006-bea5-94b31dc409e6",
  type: "page-type/module",
  slug: "swap-decision",
  definition: "which resident services stop and which starts once a caller asks for one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service already resident is not started again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warm service is evicted only for another service that is not warm.",
    },
  ],
} as const satisfies Module
