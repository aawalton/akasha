import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingEntry = {
  id: "01a06160-2a5a-71e6-8292-47916aad37fc",
  type: "page-type/module",
  slug: "trading-entry",
  definition: "what the listings add-on does as the game loads it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Expired listings are dropped before anything is captured.",
    },
  ],
} as const satisfies Module
