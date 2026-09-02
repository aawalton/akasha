import type { Module } from "@akasha/code-system/module"

export const tradingEntry = {
  id: "01a06160-2a5a-71e6-8292-47916aad37fc",
  pageTypeSlug: "module",
  slug: "trading-entry",
  definition: "what the listings add-on does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Expired listings are dropped before anything is captured.",
    },
  ],
} as const satisfies Module
