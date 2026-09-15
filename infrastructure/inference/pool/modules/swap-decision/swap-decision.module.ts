import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const swapDecision = {
  id: "01a06815-9efd-7006-bea5-94b31dc409e6",
  type: "module",
  slug: "swap-decision",
  definition: "which resident services stop and which starts when one is asked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service already resident is not started again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A warm service is evicted only for another service that is not warm.",
    },
  ],
} as const satisfies Module
