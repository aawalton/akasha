import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersHirelingMailSubscriber = {
  id: "01a062ed-3979-7008-b38a-d2d8bc3af92b",
  type: "page-type/module",
  slug: "characters-hireling-mail-subscriber",
  definition: "the answer always given to a hireling mail being looted",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A loot of nothing or a negative amount is ignored.",
    },
  ],
  createdAt: "2026-09-02T16:21:49.049Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
