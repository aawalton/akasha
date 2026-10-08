import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionStatsCalculator = {
  id: "01a06152-c2d5-77e5-9a6a-ff12bc141904",
  type: "page-type/module",
  slug: "companion-stats-calculator",
  definition: "entry point resolving a reference baseline before calculating companion stats",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The wrapper exists only to default the baseline argument.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An omitted baseline is resolved through getReferenceBaseline on every call.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.917Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies Module
