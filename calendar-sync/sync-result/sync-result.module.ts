import type { Module } from "../../code-system/modules/module.page-type.ts"

export const syncResult = {
  id: "01a05c22-7bc9-7003-8bac-008b617e1491",
  pageTypeSlug: "module",
  slug: "sync-result",
  definition: "how many events a sync wrote and skipped and failed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Results add together.",
    },
  ],
} as const satisfies Module
