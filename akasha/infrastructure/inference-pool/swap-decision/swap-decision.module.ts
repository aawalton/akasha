import type { Module } from "@akasha/code-system/module"

export const swapDecision = {
  id: "01a06815-9efd-7006-bea5-94b31dc409e6",
  pageTypeSlug: "module",
  slug: "swap-decision",
  definition: "which resident services stop and which starts when one is asked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service already resident is not started again.",
    },
    {
      invariantKind: "departure",
      statement: "A warm service is evicted only for another service that is not warm.",
    },
  ],
} as const satisfies Module
