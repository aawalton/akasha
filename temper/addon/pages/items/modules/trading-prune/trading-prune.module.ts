import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingPrune = {
  id: "01a06160-2a5b-7de7-92b4-c3276f6bde81",
  type: "page-type/module",
  slug: "trading-prune",
  definition: "dropping the listings that have aged past the expiry",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A listing older than the expiry is no longer among the guild store's listings.",
    },
  ],
  createdAt: "2026-09-02T09:08:07.387Z",
  updatedAt: "2026-09-22T02:36:59.000Z",
} as const satisfies Module
